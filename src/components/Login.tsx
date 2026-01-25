import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useApp();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = (_values: any) => {
    login();
    navigate("/shop");
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-600" />
        
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Please login to your account</p>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
              className="rounded-xl px-4 py-2.5"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 4, message: "Password must be at least 4 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
               className="rounded-xl px-4 py-2.5"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-500">Remember me</Checkbox>
            </Form.Item>
            <a href="#" className="text-primary hover:text-primary-hover font-medium text-sm">Forgot Password?</a>
          </div>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/30"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        
        <p className="text-center mt-6 text-gray-500 text-sm">
            Don't have an account? <a href="#" className="text-primary font-bold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
