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
