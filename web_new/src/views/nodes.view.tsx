<<<<<<< HEAD
import { Badge, Box, Button, Card, CardBody, CardHeader, Code, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Text, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from 'react-router-dom';

import { Loading } from "../components";
import { useNodesQuery, useHealthQuery } from "../graphql";

export function Nodes() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const { data, isLoading, isError } = useNodesQuery();
  const { data: healthData, isLoading: isHealthLoading, isError: isHealthError } = useHealthQuery();

  const code = [
    "# Install Docker",
    "curl -fsSL https://get.docker.com -o get-docker.sh",
    "sh get-docker.sh",
    "",
    "# Join the cluster",
    healthData?.health.cluster?.joinCommand,
  ].join("\n").trim();

  if (isLoading || isHealthLoading) return <Loading />

  return (
    <Box w="100%">
      <Flex direction="column" alignItems="center" justifyContent="center" gap={4}>
        <Button colorScheme="purple" alignSelf="end" onClick={onOpen}>Add node</Button>
        {data?.nodes.map((node, index) => {
          return (
            <Card key={index} size="sm" as={Link} to={`/nodes/${node.id}`}>
              <CardHeader>
                <Heading size='md'>{node.hostname}</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Ip - architecture
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {`${node.ip} - ${node.os} ${node.architecture}`}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Applications
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {`${node.services.length} apps`}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Status
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      <Badge colorScheme={`${node.status === 'ready' ? 'green' : 'red'}`}>{node.status.toUpperCase()}</Badge>
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          )
        })
        }
      </Flex >

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add node to swarm</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Code overflow="auto" display="block" p={2} whiteSpace="pre" children={code} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box >
  )
}
=======
import { useState, useRef } from "react";
import { Button, Col, Input, InputRef, Row, Space } from "antd";
import { Table, Typography } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import { useNodesQuery } from "../graphql/nodes-query.graphql";
import { Loading } from "../components";
import { Node } from "../graphql/nodes-query.graphql";
import Modal from "antd/es/modal/Modal";
import Editor from "@monaco-editor/react";
import { useHealthQuery } from "../graphql";

const { Text, Title } = Typography;

export function Nodes() {
  const { data, isLoading, isError, error } = useNodesQuery();
  const { data: healthData } = useHealthQuery();
  const [_searchText, setSearchText] = useState("");
  const [_searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (
    isError &&
    error.toString().includes("This node is not a swarm manager")
  ) {
    return (
      <Row justify="center" align="middle">
        <Col span={24}>
          <Text type="danger">
            This node is not a swarm manager. Use "docker swarm init" or "docker
            swarm join" to connect this node to swarm and try again.
          </Text>
        </Col>
      </Row>
    );
  }

  if (isLoading) return <Loading />;

  //  if (data) {
  type DataIndex = keyof Node;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Node> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]!.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<Node> = [
    {
      key: "hostname",
      title: "Name",
      dataIndex: "hostname",

      filterMode: "menu",
      filterSearch: true,
      onFilter: (value, record) => record.hostname.startsWith(value.toString()),
      width: "30%",
      sorter: true,
      ...getColumnSearchProps("hostname"),
    },
    {
      key: "os",
      title: "Operative system",
      dataIndex: "os",
      filterSearch: true,
      onFilter: (value, record) => record.os.startsWith(value.toString()),
      // sorter: (a, b) => a.age - b.age,
      width: "10%",
      sorter: true,
      responsive: ["lg"],
      ...getColumnSearchProps("os"),
    },
    {
      key: "architecture",
      title: "Architecture",
      dataIndex: "architecture",
      onFilter: (value, record) =>
        record.architecture.startsWith(value.toString()),
      filterSearch: true,
      width: "10%",
      sorter: true,
      responsive: ["lg"],
      ...getColumnSearchProps("architecture"),
    },
    {
      key: "ip",
      title: "IP",
      dataIndex: "ip",
      onFilter: (value, record) => record.ip.startsWith(value.toString()),
      filterSearch: true,
      width: "10%",
      sorter: true,
      responsive: ["md"],
      ...getColumnSearchProps("ip"),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      onFilter: (value, record) => record.status.startsWith(value.toString()),
      filterSearch: true,
      width: "10%",
      sorter: true,
      render: (text) => (
        <Text type={`${text === "ready" ? "success" : "danger"}`}>{text}</Text>
      ),
      ...getColumnSearchProps("status"),
    },
    {
      key: "services",
      title: "Applications",
      dataIndex: "services",
      onFilter: (value, record) =>
        record.services.toString().startsWith(value.toString()),
      filterSearch: true,
      width: "10%",
      sorter: true,
      responsive: ["md"],
      render: (text: []) => `${text.length} applications`,
      ...getColumnSearchProps("services"),
    },
  ];

  return (
    <>
      <Row align="middle">
        <Col span={22}>
          <Title level={4} style={{ margin: 0 }}>
            Nodes
          </Title>
          {/* nodes */}
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            <PlusOutlined />
            Add
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: "1.5em" }}>
        <Col span={24}>
          <Table
            bordered
            columns={columns}
            dataSource={data?.nodes}
            rowKey="hostname"
          />
        </Col>
      </Row>
      <Modal
        title="Add node to swarm"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Editor
          height="200px"
          defaultLanguage="powershell"
          theme="vs-dark"
          options={{
            lineNumbers: "off",
            readOnly: true,
            minimap: {
              enabled: false,
            },
            padding: {
              top: 15,
            },
          }}
          value={[
            "# Install Docker",
            "curl -fsSL https://get.docker.com -o get-docker.sh",
            "sh get-docker.sh",
            "",
            "# Join the cluster",
            healthData?.health.cluster?.joinCommand,
          ]
            .join("\n")
            .trim()}
        />
      </Modal>
    </>
  );
  // }
}
>>>>>>> 2d5addc1ce14dfcb3a82dcdd45043d0ae852a2b5
