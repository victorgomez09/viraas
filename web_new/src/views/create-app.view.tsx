import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useCallback } from "react";
import { useCreateAppMutation } from "../graphql/create-app-mutation.graphql";

const { Title } = Typography;

interface FormValues {
  name: string;
  image: string;
  autoUpgrade?: Boolean;
  group?: string;
  hidden?: boolean;
  targetPorts: number[];
  publishedPorts: number[];
  placement: string[];
  volumes: BoundVolumeInput[];
  networks: string[];
  command: string[];
}

interface BoundVolumeInput {
  target: string;
  source: string;
}

export function CreateApp() {
  const [form] = Form.useForm();
  const { data, error, isLoading, mutate } = useCreateAppMutation();

  const onFinish = (values: FormValues) => {
    console.log("Received values of form: ", values);

    mutate({ app: values });
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <Title level={3} style={{ textAlign: "center", display: "block" }}>
          Deploy new app
        </Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input application name",
                type: "string",
              },
            ]}
            label="Name"
            style={{ marginBottom: "2em" }}
          >
            <Input
              placeholder="Docker image name"
              onChange={() => form.validateFields(["name"])}
              onBlur={() => form.validateFields(["name"])}
            />
          </Form.Item>

          <Form.Item
            name="targetPorts"
            label="Target ports"
            rules={[
              { required: true, message: "Please input your target ports" },
            ]}
          >
            <Input
              type="text"
              placeholder="Target ports separated by comma (8080, 8082)"
              onChange={() => form.validateFields(["targetPorts"])}
              onBlur={() => form.validateFields(["targetPorts"])}
            />
          </Form.Item>

          <Form.Item name="publishedPorts" label="Ports to publish">
            <Input
              type="text"
              placeholder="Ports to publish separated by comma (8080, 8082)"
              onChange={() => form.validateFields(["publishedPorts"])}
              onBlur={() => form.validateFields(["publishedPorts"])}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: "2em" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "1em", width: "100%" }}
            >
              Deploy app
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
