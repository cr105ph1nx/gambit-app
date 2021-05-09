import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogin,
  loginPending,
  loginFail,
  loginSuccess,
} from "./loginSlicer";

import Board from "../board/Board";
import Panel from "../panel/Panel";

import "./login.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { error, isAuth, isLoading, role } = useSelector(
    (state) => state.login
  );

  const [state, setState] = useState({ email: "", password: "" });

  const handleChangeEmail = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setState({
      email: e.target.value,
      password: state.password,
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setState({
      email: state.email,
      password: e.target.value,
    });
  };

  function handleFormSubmit() {
    dispatch(fetchLogin(state));
    if (role === "participant") history.push("/board");
    else if (role === "admin") history.push("panel");
  }

  const handleSubmit = async (e) => {
    try {
      console.log(state);
      await dispatch(fetchLogin(state));
      if (role === "participant") history.push("/board");
      else if (role === "admin") history.push("panel");
    } catch (err) {
      console.log("Couldn't Log In");
    }
  };

  if (localStorage.token) {
    if (role === "participant") history.push("/board");
    else if (role === "admin") history.push("panel");
  }

  return (
    <>
      <Form {...layout} name="basic">
        {error && <Alert message={error} type="error" />}
        <Form.Item
          label="email"
          name="email"
          onChange={handleChangeEmail}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          onChange={handleChangePassword}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
