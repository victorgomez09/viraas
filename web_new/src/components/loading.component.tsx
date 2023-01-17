import { Col, Row, Space, Spin } from "antd";

export function Loading() {
  return (
    <Row align="middle" justify="center" style={{ height: '100%' }}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </Space>
      </Col>
    </Row>
  )
}