import { getRow, getCol } from "./BoardSettings";

const user = {
  email: "lilia.mehamli@protonmail.com",
  password: "omcomcomc",
  startingpoint: 5,
  currentCase: 5,
  flagsRemaining: 5,
  points: 0,
  pendingAuthorization: true,
};

const clubs = [
  {
    id: 1,
    position: "a4",
    name: "OpenMinds",
    logo: "",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 2,
    position: "b2",
    name: "Operations Research Society",
    logo: "",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 3,
    position: "g5",
    name: "Chess Club",
    logo: "",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 4,
    position: "f3",
    name: "Ozone",
    logo: "",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 5,
    position: "e4",
    name: "Orbis",
    logo: "",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 6,
    position: "b7",
    name: "MicroClub",
    logo: "",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 7,
    position: "d7",
    name: "Celec",
    logo: "",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.`,
  },
];

const arsenal = [
  { id: "q", number: 1 },
  { id: "r", number: 2 },
  { id: "b", number: 2 },
  { id: "n", number: 2 },
];

export function getUser() {
  return user;
}

export function getStartingPosition(callback) {
  let startingPosition = {};
  clubs.forEach((club) => {
    if (club.id === user.startingpoint) {
      startingPosition[club.position] = "wK";
      callback(startingPosition);
    }
  });
}

export function getStartingCase(callback) {
  let startingCase = {};

  clubs.forEach((club) => {
    if (club.id === user.startingpoint) {
      startingCase.notation = club.position;
      startingCase.row = getRow(club.position);
      startingCase.col = getCol(club.position);
      startingCase.visited = true;

      callback(startingCase);
    }
  });
}

export function getClubs() {
  return clubs;
}

export function getArsenal() {
  return arsenal;
}
