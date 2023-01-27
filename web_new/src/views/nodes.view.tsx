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