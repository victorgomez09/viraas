import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";

import { useNodesQuery } from "../graphql/nodes-query.graphql"
import { Loading } from "../components";

export function Nodes() {
  const { data, isLoading, isError } = useNodesQuery();

  if (isLoading) return <Loading />

  if (data) {
    return (
      <Row justify="center" align="middle">
        <Col span={24}>
          {data.nodes.map((node, index) => {
            return (
              <Card
                hoverable
                key={index}
                style={{ textAlign: 'center' }}
              >
                <Meta title={node.hostname} description={`${node.ip} - ${node.os} ${node.architecture}`} />
                <Meta description={`${node.services.length} apps`} />
              </Card>
            )
          })}
        </Col>
      </Row>
    )
  }
}