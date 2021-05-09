import { Modal, Button, Row, Col } from "antd";
import { useState } from "react";
import { getClubs } from "../models";
import WinLossPolicies from "./WinLossPolicies";
import {
  isRookValid,
  isBishopValid,
  isQueenValid,
  isKnightValid,
} from "../models/Pieces";
import flag from "../img/finish.png";

function Popup(props) {
  const [isUserPending, setIsUserPending] = useState(true);
  const [usedPiece, setUsedPiece] = useState("");
  const illegalCaseStyle = { cursor: "pointer", backgroundColor: "yellow" };
  const currentCaseStyle = { cursor: "pointer", backgroundColor: "red" };
  const unvisitedSquareStyle = {
    cursor: "pointer",
    backgroundColor: "green",
    backgroundImage: `url(${flag})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const visitedSquareStyle = {
    cursor: "pointer",
    backgroundColor: "green",
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };

  const clubs = getClubs();

  function updateStyles() {
    let squareStyles = {};
    // change styles of current and starting square
    props.positions.forEach((position) => {
      // if it is the square the user is coming from, make it yellow to indicate that it is illegal:
      if (position.notation === props.currentSquare.notation)
        squareStyles[position.notation] = illegalCaseStyle;
      // if current sqaure, make it red
      else if (position.notation === props.desiredSquare.notation)
        squareStyles[position.notation] = currentCaseStyle;
      // if neither illegal nor current, check if it is visited
      else if (position.visited)
        squareStyles[position.notation] = visitedSquareStyle;
      // if it is not visited, remove flag
      else squareStyles[position.notation] = unvisitedSquareStyle;
    });
    props.setSquareStyles(squareStyles);
  }

  function swapCurrentCase(desired) {
    let tmp = {};
    // change starting case to current case
    tmp.notation = desired.notation;
    tmp.row = desired.row;
    tmp.col = desired.col;
    tmp.visited = true;

    props.setCurrentSquare(tmp);
  }

  function swapStartingCase(current) {
    // change starting case to current case
    props.setStartingCase(current);
  }

  function movePiece(piece) {
    // update piece that was clicked
    setUsedPiece(piece);
    // swap pieces: starting = current
    swapStartingCase(props.currentSquare);
    // swap current and desired
    swapCurrentCase(props.desiredSquare);

    // move white king to desiredsquare
    let position = {};
    position[props.desiredSquare.notation] = "wK";
    props.setStartingPosition(position);
    // change style of the board
    updateStyles();
    setIsUserPending(true);
  }

  function pieceIsValid(piece) {
    // I have the piece, currentsquare, desiredsquare
    let legal = false;
    switch (piece) {
      case "r":
        legal = isRookValid(props.currentSquare, props.desiredSquare);
        break;
      case "b":
        legal = isBishopValid(props.currentSquare, props.desiredSquare);
        break;
      case "n":
        legal = isKnightValid(props.currentSquare, props.desiredSquare);
        break;
      case "q":
        legal = isQueenValid(props.currentSquare, props.desiredSquare);
        break;
      default:
        break;
    }

    return legal;
  }

  return (
    <>
      {clubs.map((club, index) => (
        <div key={index}>
          {club.position === props.desiredSquare.notation && (
            <Modal
              title={club.name}
              visible={props.isModalVisible}
              onCancel={handleCancel}
            >
              <p>Your are in : {props.currentSquare.notation}</p>
              <p>Target in : {props.desiredSquare.notation}</p>

              <p>{club.description}</p>

              {(() => {
                if (isUserPending === false) {
                  if (
                    props.desiredSquare.notation ===
                    props.currentSquare.notation
                  ) {
                    return (
                      <>
                        <h3>
                          You can now move to another case! You won't be able to
                          come back here in a while
                        </h3>
                        <p>
                          PS: Choose the piece you use wisely because you can
                          lose it!
                        </p>
                      </>
                    );
                  }
                  if (
                    props.desiredSquare.notation === props.startingCase.notation
                  ) {
                    return (
                      <>
                        <h3>You just came from here...</h3>
                      </>
                    );
                  } else {
                    return (
                      <Row gutter={[32, 16]}>
                        {props.userState.arsenal.map((piece, index) => (
                          <Col key={index}>
                            {piece.number > 0 && pieceIsValid(piece.id) && (
                              <Button
                                type="primary"
                                onClick={() => movePiece(piece.id)}
                              >
                                {piece.name}
                              </Button>
                            )}
                          </Col>
                        ))}
                      </Row>
                    );
                  }
                } else {
                  if (
                    props.desiredSquare.notation ===
                    props.currentSquare.notation
                  ) {
                    return (
                      <>
                        <h3>
                          You can now challenge {club.name} on a match!
                          (Awaiting admin's response...)
                        </h3>
                        <WinLossPolicies
                          userState={props.userState}
                          setUserState={props.setUserState}
                          desiredSquare={props.desiredSquare}
                          setDesiredSquare={props.setDesiredSquare}
                          currentSquare={props.currentSquare}
                          setCurrentSquare={props.setCurrentSquare}
                          isUserPending={isUserPending}
                          setIsUserPending={setIsUserPending}
                          positions={props.positions}
                          setPositions={props.setPositions}
                          usedPiece={usedPiece}
                        ></WinLossPolicies>
                      </>
                    );
                  } else {
                    return (
                      <h3>
                        You can't go here until you finish your match! (Awaiting
                        admin's response...)
                      </h3>
                    );
                  }
                }
              })()}
            </Modal>
          )}
        </div>
      ))}
    </>
  );
}

export default Popup;
