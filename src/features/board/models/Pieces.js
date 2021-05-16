export function pieceIsValid(piece, currentSquare, desiredSquare) {
  // I have the piece, currentsquare, desiredsquare
  let legal = false;

  switch (piece) {
    case "r":
      legal = isRookValid(currentSquare, desiredSquare);
      break;
    case "b":
      legal = isBishopValid(currentSquare, desiredSquare);
      break;
    case "n":
      legal = isKnightValid(currentSquare, desiredSquare);
      break;
    case "q":
      legal = isQueenValid(currentSquare, desiredSquare);
      break;
    default:
      break;
  }

  return legal;
}

function isRookValid(currentSquare, desiredSquare) {
  if (
    currentSquare.row === desiredSquare.row ||
    currentSquare.col === desiredSquare.col
  )
    return true;
  else return false;
}

function isBishopValid(currentSquare, desiredSquare) {
  let I = currentSquare.row,
    P = currentSquare.col,
    J = desiredSquare.row,
    Q = desiredSquare.col;

  if (Math.abs(I - J) === Math.abs(P - Q)) {
    return true;
  } else return false;
}

function isQueenValid(currentSquare, desiredSquare) {
  if (
    isRookValid(currentSquare, desiredSquare) ||
    isBishopValid(currentSquare, desiredSquare)
  )
    return true;
  else return false;
}

function isKnightValid(currentSquare, desiredSquare) {
  let I = currentSquare.row,
    P = currentSquare.col,
    J = desiredSquare.row,
    Q = desiredSquare.col;

  if (
    ((J === I + 2 || J === I - 2) && (Q === P + 1 || Q === P - 1)) ||
    ((J === I + 1 || J === I - 1) && (Q === P + 2 || Q === P - 2))
  )
    return true;
  else return false;
}
