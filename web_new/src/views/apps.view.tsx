import { PlusOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, List, Modal, Row, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components";
import { useAppListQuery } from "../graphql/applications-query.graphql";

const { Title, Text, Link } = Typography;

export function Apps() {
  const { data, isLoading, error } = useAppListQuery({
    clusterIpAddress: location.hostname,
    showHidden: false,
  });
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  return (
    <>
      <Row align="middle">
        <Col span={22}>
          <Title level={4} style={{ margin: 0 }}>
            Applications
          </Title>
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={() => navigate("/apps/create")}>
            <PlusOutlined />
            Add
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: "1.5em" }}>
        <Col span={24}>
          <List
            grid={{
              gutter: 4,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={data?.apps}
            renderItem={(item) => (
              <List.Item style={{ padding: 0 }}>
                <Card bordered>
                  <Meta title={item.name} style={{ marginBottom: "1em" }} />
                  <Text>
                    <Badge
                      status={`${
                        item.status === "RUNNING" ? "success" : "error"
                      }`}
                      text={item.status.toLowerCase()}
                    />{" "}
                    {item.instances?.total}/{item.instances?.total}
                  </Text>
                  <Link href={item.availableAt[0]} target="_blank" ellipsis>
                    {item.availableAt}
                  </Link>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
