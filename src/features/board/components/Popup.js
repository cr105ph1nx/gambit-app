import { Modal, Button, Row, Col } from "antd";
import { pieceIsValid } from "../models/Pieces";
import { useDispatch, useSelector } from "react-redux";
import { updateMove } from "../boardSlicer";

function Popup(props) {
  let dispatch = useDispatch();
  const { _id, arsenal, pendingAuthorization } = useSelector(
    (state) => state.participant
  );
  const { clubsResult } = useSelector((state) => state.clubs);
  const { startingCase, currentSquare, desiredSquare } = useSelector(
    (state) => state.board
  );

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };

  async function movePiece(piece, club_id) {
    dispatch(
      updateMove({
        participant_id: _id,
        club_id: club_id,
        piece: piece,
      })
    );
    props.setRefresh(true);
  }

  return (
    <>
      {clubsResult.map((club, index) => (
        <div key={index}>
          {club.position === desiredSquare.notation && (
            <Modal
              title={club.name}
              visible={props.isModalVisible}
              onCancel={handleCancel}
            >
              <p>Your are in : {currentSquare.notation}</p>
              <p>Target in : {desiredSquare.notation}</p>

              <p>{club.description}</p>

              {(() => {
                if (pendingAuthorization === false) {
                  if (desiredSquare.notation === currentSquare.notation) {
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
                  if (desiredSquare.notation === startingCase.notation) {
                    return (
                      <>
                        <h3>You just came from here...</h3>
                      </>
                    );
                  } else {
                    return (
                      <Row gutter={[32, 16]}>
                        {arsenal.map((piece, index) => (
                          <Col key={index}>
                            {piece.number > 0 &&
                              pieceIsValid(
                                piece.id,
                                currentSquare,
                                desiredSquare
                              ) && (
                                <Button
                                  type="primary"
                                  onClick={() => movePiece(piece.id, club._id)}
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
                  if (desiredSquare.notation === currentSquare.notation) {
                    return (
                      <>
                        <h3>
                          You can now challenge {club.name} on a match!
                          (Awaiting admin's response...)
                        </h3>
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
