import { useState } from "react";
import { Modal, Button, Row, Col } from "antd";

function WinLossPolicies(props) {
  const [result, setResult] = useState(0);

  function updatePositions(tmp) {
    // iterate through positions and fill tmpPosition
    let tmpPositions = [];
    props.positions.forEach((position) => {
      if (position.notation === tmp.notation) tmpPositions.push(tmp);
      else tmpPositions.push(position);
    });
    // set positions state to tmpPositions
    props.setPositions(tmpPositions);
  }

  function continueGame() {
    // update positions
    updatePositions(props.currentSquare);

    // change user state to not pending
    props.setIsUserPending(false);
  }

  function isWin(points) {
    let tmpUser = {};
    tmpUser.points = props.userState.points + points;
    tmpUser.arsenal = props.userState.arsenal;
    if (props.desiredSquare.visited) {
      tmpUser.flagsRemaining = props.userState.flagsRemaining;
    } else {
      tmpUser.flagsRemaining = props.userState.flagsRemaining - 1;
    }

    // update user state
    props.setUserState(tmpUser);

    continueGame();
  }

  function isLoss() {
    setResult(0);
    // remove piece from arsenal
    if (props.piece !== "") {
      let tmpUser = {};

      tmpUser.points = props.userState.points;
      if (props.desiredSquare.visited) {
        tmpUser.flagsRemaining = props.userState.flagsRemaining;
      } else {
        tmpUser.flagsRemaining = props.userState.flagsRemaining - 1;
      }

      let tmpArsenal = [];
      props.userState.arsenal.forEach((piece) => {
        if (piece.id === props.usedPiece) {
          let tmpPiece = {};
          tmpPiece.id = piece.id;
          tmpPiece.name = piece.name;
          tmpPiece.number = piece.number - 1;

          tmpArsenal.push(tmpPiece);
        } else {
          tmpArsenal.push(piece);
        }
      });
      tmpUser.arsenal = tmpArsenal;

      props.setUserState(tmpUser);
    }

    continueGame();
  }

  return (
    <>
      <div className="win-loss">
        <Button onClick={() => setResult(1)}>Win</Button>
        <Button onClick={isLoss}>Loss</Button>
      </div>

      {result === 1 && (
        <div>
          <Button onClick={isWin(50)}>Beginner</Button>
          <Button onClick={isWin(100)}>Intermediate</Button>
        </div>
      )}
    </>
  );
}

export default WinLossPolicies;
