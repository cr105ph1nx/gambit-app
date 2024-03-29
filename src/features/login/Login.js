import { Form, Input, Button, Alert } from "antd";
import { useEffect, useState } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, fetchRole } from "./loginSlicer";

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
  const { error, isLoading, role } = useSelector((state) => state.login);

  const [state, setState] = useState({ email: "", password: "" });

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setState({
      email: e.target.value,
      password: state.password,
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setState({
      email: state.email,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const login = await dispatch(fetchLogin(state));
      if (login && role === "participant") history.push("/board");
      else if (login && role === "admin") history.push("/panel");
    } catch (err) {
      console.log("Couldn't Log In");
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      // redirect based on role
      if (role === "participant") history.push("/board");
      else if (role === "admin") history.push("/panel");
    }
  });

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

      <Switch>
        <Route exact path="/board" component={Board} />
        <Route exact path="/panel" component={Panel} />
      </Switch>
    </>
  );
}

export default Login;
