import "antd/dist/antd.css";
import Chessboard from "chessboardjsx";
import Popup from "./components/Popup";
import Score from "./components/Score";
import Arsenal from "./components/Arsenal";
import { getRow, getCol } from "./models/BoardSettings";
import { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchParticipant } from "../participant/participantSlicer";
import { fetchClubs } from "../clubs/clubsSlicer";
import {
  getStartingPosition,
  getStartingCase,
  setBoardSettings,
  setDesiredSquare,
  fetchStyles,
} from "./boardSlicer";

function Board() {
  let history = useHistory();
  const dispatch = useDispatch();

  const { startingPosition, squareStyles, positions } = useSelector(
    (state) => state.board
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getParticipantInfo = async () => {
    await dispatch(fetchParticipant()).then(async () => {
      await dispatch(fetchClubs()).then(async () => {
        await dispatch(getStartingPosition()).then(async () => {
          await dispatch(fetchStyles()).then(async () => {
            await dispatch(getStartingCase()).then(async () => {
              await dispatch(setBoardSettings());
            });
          });
        });
      });
    });
  };

  useEffect(() => {
    getParticipantInfo();

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
            history.push("/board");
          }
          return Promise.reject(error);
        }
      );
    }
  }, [refresh]);

  function onSquareClick(square) {
    // exclude squares that aren't in positions
    positions.forEach((position) => {
      if (position.notation === square) {
        setIsModalVisible(true);
        let tmp = {};
        tmp.notation = square;
        tmp.row = getRow(square);
        tmp.col = getCol(square);
        if (position.visited) tmp.visited = true;
        else tmp.visited = false;

        dispatch(setDesiredSquare(tmp));
      }
    });
  }

  const handleLogout = () => {
    history.push("/login");
    localStorage.removeItem("token");
  };

  return (
    <>
      <Row>
        <Col>
          <Score></Score>
          <Arsenal></Arsenal>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Col>

        <Col>
          <Chessboard
            position={startingPosition}
            onSquareClick={onSquareClick}
            squareStyles={squareStyles}
            draggable={false}
            lightSquareStyle={{ backgroundColor: "AliceBlue" }}
            darkSquareStyle={{ backgroundColor: "CornFlowerBlue" }}
          />
        </Col>
      </Row>

      <Popup
        setRefresh={setRefresh}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      ></Popup>
    </>
  );
}

export default Board;
