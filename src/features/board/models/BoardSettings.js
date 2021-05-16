import flag from "../img/finish.png";

export function getRow(notation) {
  let row = notation.charAt(0);

  switch (row) {
    case "a":
      return 0;
    case "b":
      return 1;
    case "c":
      return 2;
    case "d":
      return 3;
    case "e":
      return 4;
    case "f":
      return 5;
    case "g":
      return 6;
    case "h":
      return 7;
    default:
      return null;
  }
}

export function getCol(notation) {
  let col = notation.charAt(1);
  let colNumber = parseInt(col) - 1;
  return colNumber;
}


export const squareStyle = {
  cursor: "pointer",
  backgroundColor: "green",
  backgroundImage: `url(${flag})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export const startingpointStyle = { cursor: "pointer", backgroundColor: "red" };
export const illegalCaseStyle = { cursor: "pointer", backgroundColor: "yellow" };
export const currentCaseStyle = { cursor: "pointer", backgroundColor: "red" };
export const unvisitedSquareStyle = {
  cursor: "pointer",
  backgroundColor: "green",
  backgroundImage: `url(${flag})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
export const visitedSquareStyle = {
  cursor: "pointer",
  backgroundColor: "green",
};