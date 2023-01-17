import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";

interface FormValues {
  email: string
  password: string
}

export function Login() {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={12} sm={8} md={6} lg={6} xl={6}>
        <Title level={3} style={{ textAlign: 'center', display: 'block' }}>Login</Title>
        <Form
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email', type: 'email' }]}
            style={{ marginBottom: '2em' }}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" onChange={() => form.validateFields(['email'])} onBlur={() => form.validateFields(['email'])} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={() => form.validateFields(['password'])}
              onBlur={() => form.validateFields(['password'])}
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item style={{ marginTop: '2em' }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '1em', width: '100%' }}>
              Log in
            </Button>
            {/* Or <Link to="/register">register now!</Link> */}
          </Form.Item>
        </Form>
      </Col>
    </Row>

  )
}