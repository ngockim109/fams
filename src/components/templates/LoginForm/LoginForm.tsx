import React from "react";
import { Button, Checkbox, Form, Input, Card } from "antd";
import "./LoginForm.scss";
import Logo from "../../../../public/assets/images/logoSoftware.jpg";
import { useAuthStore } from "../../../store/AuthStore";

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

const LoginForm: React.FC = () => {
  const { loading, postLogin } = useAuthStore();

  return (
    <div className="centered login-form-container">
      <img src={Logo} alt="FPT Software" className=" login-logo" />
      <Card hoverable className="login-card">
        <Form
          className="login-form"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={postLogin}
          autoComplete="on"
          colon={false}
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            className="centered"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item className="centered">
            <Button type="primary" htmlType="submit" loading={loading}>
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
