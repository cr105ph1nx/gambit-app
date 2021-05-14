import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Space, Tag, Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin } from "../admin/adminSlicer";
import { fetchClubParticipants } from "../panel/panelSlicer";
import ManageModal from "./ManageModal";
const { Text } = Typography;

function Panel() {
  let history = useHistory();

  const dispatch = useDispatch();
  const { participantsResults } = useSelector((state) => state.panel);
  const { club_id } = useSelector((state) => state.admin);
  const [refresh, setRefresh] = useState(false)

  const getClubParticipants = async () => {
    //get info of admin
    await dispatch(fetchAdmin())
      .then(() => {
        // get info of club participants
        dispatch(fetchClubParticipants());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.token) history.push("/login");
    else {
      // push history if token deleted or changed
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

    getClubParticipants();
  }, [refresh]);

  const renderSwitch = (param) => {
    switch (param) {
      case "q":
        return "queen";
      case "b":
        return "bishop";
      case "n":
        return "knight";
      case "r":
        return "rook";
      default:
        return "king";
    }
  }

  const columns = [
    {
      title: "Username",
      dataIndex: "participant_id",
      key: "participant_id",
      render: (participant_id) => <Text>{participant_id.username}</Text>,
    },
    {
      title: "Piece",
      dataIndex: "piece",
      key: "piece",
      render: (tag) => (
        <Tag color={"geekblue"} key={tag}>
          {renderSwitch(tag).toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <ManageModal setRefresh={setRefresh} username = {record.participant_id.username} participant_id = {record.participant_id._id} club_id = {club_id} piece = {record.piece}id={record._id}/>
        </Space>
      ),
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
      <Table columns={columns} dataSource={participantsResults} />
    </>
  );
}

export default Panel;
