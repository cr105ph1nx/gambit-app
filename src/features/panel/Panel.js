import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Space, Tag, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin } from "../admin/adminSlicer";
import { fetchRole } from "../login/loginSlicer";
import { fetchClubParticipants } from "./panelSlicer";

function Panel() {
  let history = useHistory();

  const dispatch = useDispatch();
  const { club_id } = useSelector((state) => state.admin);
  const { participantsResults } = useSelector((state) => state.panel);
  const { role } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchAdmin());
    dispatch(fetchClubParticipants({ club_id: club_id }));
    console.log(participantsResults);
  }, []);

  useEffect(() => {
    if (!localStorage.token) history.push("/login");
    else {
      dispatch(fetchRole());
      if (role !== "admin") history.push("/");
      const UNAUTHORIZED = 401;
      const FORBIDDEN = 403;
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          const { status } = error.response;
          if (status === UNAUTHORIZED) {
            history.push("/login");
            localStorage.removeItem("token");
          } else if (status === FORBIDDEN) {
            history.push("/admin");
          }
          return Promise.reject(error);
        }
      );
    }
  }, []);
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Piece",
      dataIndex: "piece",
      key: "piece",
      render: (tag) => (
        <Tag color={"geekblue"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Starting Case",
      dataIndex: "startingCase",
      key: "startingCase",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Manage {record.name}</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      username: "cr105ph1nx",
      piece: "Queen",
      startingCase: "OpenMindsClub",
    },
    {
      key: "2",
      username: "serinir",
      piece: "Bishop",
      startingCase: "Orbis",
    },
  ];

  const handleLogout = () => {
    history.push("/login");
    localStorage.removeItem("token");
  };

  return (
    <>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default Panel;
