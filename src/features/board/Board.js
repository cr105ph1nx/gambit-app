import "antd/dist/antd.css";
import Chessboard from "chessboardjsx";
import Popup from "./components/Popup";
import Score from "./components/Score";
import Arsenal from "./components/Arsenal";
import flag from "./img/finish.png";
import { getClubs, getStartingCase, getStartingPosition } from "./models";
import { getRow, getCol } from "./models/BoardSettings";
import { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./boardSlicer";

function Board() {
  let history = useHistory();

  const dispatch = useDispatch();
  const { error, isLoading, info } = useSelector((state) => state.participant);
  const { role } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchData());
    console.log(info);
  }, []);

  const [userState, setUserState] = useState({
    points: 0,
    flagsRemaining: 6,
    arsenal: [
      { id: "q", name: "Queen", number: 1 },
      { id: "r", name: "Rook", number: 2 },
      { id: "b", name: "Bishop", number: 2 },
      { id: "n", name: "Knight", number: 2 },
    ],
  });
  const [squareStyles, setSquareStyles] = useState({});
  const [positions, setPositions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startingPosition, setStartingPosition] = useState({});

  const [currentSquare, setCurrentSquare] = useState({});
  const [desiredSquare, setDesiredSquare] = useState({});
  const [startingCase, setStartingCase] = useState({});

  useEffect(() => {
    let startingCase = {};
    getStartingCase(function (sp) {
      startingCase = sp;
      setStartingCase(sp);
    });

    getStartingPosition(function (sp) {
      setStartingPosition(sp);
    });

    const clubs = getClubs();

    const addPosition = (position) => {
      let tmp = {};
      tmp.notation = position;
      tmp.row = getRow(position);
      tmp.col = getCol(position);

      if (position === startingCase.notation) {
        tmp.visited = true;
        setCurrentSquare(tmp);
      } else {
        tmp.visited = false;
      }

      return tmp;
    };

    const setBoardSettings = () => {
      let squareStyle = {
        cursor: "pointer",
        backgroundColor: "green",
        backgroundImage: `url(${flag})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      };
      let startingpointStyle = { cursor: "pointer", backgroundColor: "red" };
      let squareStyles = {};

      let tmpPositions = [];

      clubs.forEach((club) => {
        // add style to case
        if (club.position === startingCase.notation) {
          squareStyles[club.position] = startingpointStyle;
        } else {
          squareStyles[club.position] = squareStyle;
        }

        // save position to array
        tmpPositions.push(addPosition(club.position));
      });

      setPositions(tmpPositions);
      setSquareStyles(squareStyles);
    };

    setBoardSettings();
  }, []);

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

        setDesiredSquare(tmp);
      }
    });
  }

  if (!localStorage.token) history.push("/login");
  if (role !== "participant") history.push("/");
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

  const handleLogout = () => {
    history.push("/login");
    localStorage.removeItem("token");
  };

  return (
    <>
      <Row>
        <Col>
          <Score userState={userState} setUserState={setUserState}></Score>
          <Arsenal userState={userState} setUserState={setUserState}></Arsenal>
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
        setIsModalVisible={setIsModalVisible}
        startingPosition={startingPosition}
        setStartingPosition={setStartingPosition}
        startingCase={startingCase}
        setStartingCase={setStartingCase}
        isModalVisible={isModalVisible}
        currentSquare={currentSquare}
        setCurrentSquare={setCurrentSquare}
        desiredSquare={desiredSquare}
        setDesiredSquare={setDesiredSquare}
        setSquareStyles={setSquareStyles}
        positions={positions}
        setPositions={setPositions}
        userState={userState}
        setUserState={setUserState}
      ></Popup>
    </>
  );
}

export default Board;
