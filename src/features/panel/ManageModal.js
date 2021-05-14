import "./panel.css";
import {
  DRAW,
  WIN,
  LOSS,
  WIN_BEGINNER_POINTS,
  WIN_INTERMEDIATE_POINTS,
} from "../../constants/index";
import axios from "axios";
import { Modal, Table, Space, Tag, Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from "./panelSlicer";

function ManageModal(props) {
  let dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResultHandled, setIsResultHandled] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    props.setRefresh(false);
  }, []);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleWin = (points) => {
    // send points to win post request
    dispatch(
      updateResult({
        result: WIN,
        id: props.id,
        participant_id: props.participant_id,
        club_id: props.club_id,
        points: points,
      })
    );
    setIsModalVisible(false);
    props.setRefresh(true);
  };

  const handleLoss = () => {
    // send loss post request
    dispatch(
      updateResult({
        result: LOSS,
        id: props.id,
        participant_id: props.participant_id,
        club_id: props.club_id,
        piece: props.piece,
      })
    );
    setIsModalVisible(false);
    props.setRefresh(true);
  };

  const handleDraw = () => {
    // send loss post request
    dispatch(
      updateResult({
        result: DRAW,
        id: props.id,
        participant_id: props.participant_id,
        club_id: props.club_id,
      })
    );
    setIsModalVisible(false);
    props.setRefresh(true);
  };

  return (
    <>
      <Button className="modal-button" onClick={showModal}>
        Manage
      </Button>
      <Modal
        title={props.username}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          the user {props.username} with the ID {props.participant_id}, is
          positioned at your club with the piece {props.piece}
        </p>
        {(() => {
          if (!isResultHandled) {
            return (
              <>
                <p>Did they lose or win?</p>
                <Button
                  onClick={() => {
                    setIsResultHandled(true);
                    setIsWin(true);
                  }}
                >
                  Win
                </Button>
                <Button
                  onClick={() => {
                    setIsResultHandled(true);
                    handleLoss();
                  }}
                >
                  Loss
                </Button>
                <Button
                  onClick={() => {
                    setIsResultHandled(true);
                    handleDraw();
                  }}
                >
                  Draw
                </Button>
              </>
            );
          } else if (isWin) {
            return (
              <>
                <p>Level Challenged?</p>
                <Button
                  onClick={() => {
                    handleWin(WIN_BEGINNER_POINTS);
                  }}
                >
                  Beginner
                </Button>
                <Button
                  onClick={() => {
                    handleWin(WIN_INTERMEDIATE_POINTS);
                  }}
                >
                  Intermediate
                </Button>
              </>
            );
          }
        })()}
      </Modal>
    </>
  );
}

export default ManageModal;
