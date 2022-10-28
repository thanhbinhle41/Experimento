import { Button, Form, Input } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authSliceActions,
  passwordAdminSelector,
  usernameAdminSelector,
} from "../../services/authSlice";

const AdminAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameAdmin = useSelector(usernameAdminSelector);
  const passwordAdmin = useSelector(passwordAdminSelector);

  const onFinish = (values) => {
    const { username, password } = values;
    if (username === usernameAdmin && passwordAdmin === password) {
      dispatch(authSliceActions.setIsAdmin(true));
      navigate("/admin/dashboard");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminAuth;
