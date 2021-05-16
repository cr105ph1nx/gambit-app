import { createSlice } from "@reduxjs/toolkit";
import {
  updateMoveUrl,
  updateStartingPositionUrl,
  updateStartingCaseUrl,
  updateCurrentSquareUrl,
} from "../../constants";
import axios from "axios";
import {
  getRow,
  getCol,
  squareStyle,
  startingpointStyle,
  illegalCaseStyle,
  currentCaseStyle,
  visitedSquareStyle,
  unvisitedSquareStyle,
} from "./models/BoardSettings";

const initState = {
  startingPosition: {},
  startingCase: {},
  squareStyles: {},
  positions: [],
  currentSquare: {},
  desiredSquare: {},
  error: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState: initState,
  reducers: {
    setStartingPosition: (state, { payload }) => {
      state.startingPosition = payload;
    },
    setStartingCase: (state, { payload }) => {
      state.startingCase = payload;
    },
    setPositions: (state, { payload }) => {
      state.positions = payload;
    },
    setSquareStyles: (state, { payload }) => {
      state.squareStyles = payload;
    },
    setCurrentSquare: (state, { payload }) => {
      state.currentSquare = payload;
    },
    setDesiredSquare: (state, { payload }) => {
      state.desiredSquare = payload;
    },
    fetchFail: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getStartingPosition = (data) => async (dispatch, getState) => {
  let startingPosition = {};
  let clubs = getState().clubs.clubsResult;
  let startingpoint = getState().participant.startingpoint;

  for (let i in clubs) {
    let club = clubs[i];
    if (club._id === startingpoint) {
      startingPosition[club.position] = "wK";

      // update starting position
      let jwt_token = "Bearer " + localStorage.token;
      const config = {
        method: "post",
        url: updateStartingPositionUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt_token,
        },
        data: {
          startingPosition: startingPosition,
          participant_id: getState().participant._id
        }
      };

      const response = await axios(config)
        .then((response) => {
          console.log(response.data);
          dispatch(setStartingPosition(startingPosition));
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(fetchFail(error.message));
        });
    }
  }
};

export const getStartingCase = (data) => async (dispatch, getState) => {
  let startingCase = {};

  let clubs = getState().clubs.clubsResult;
  let startingpoint = getState().participant.startingpoint;

  for (let i in clubs) {
    let club = clubs[i];

    if (club._id === startingpoint) {
      startingCase.notation = club.position;
      startingCase.row = getRow(club.position);
      startingCase.col = getCol(club.position);
      startingCase.visited = true;

      // update starting case
      let jwt_token = "Bearer " + localStorage.token;
      const config = {
        method: "post",
        url: updateStartingCaseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt_token,
        },
        data: {
          startingCase: startingCase,
          participant_id: getState().participant._id
        }
      };

      const response = await axios(config)
        .then((response) => {
          console.log(response.data);
          dispatch(setStartingCase(startingCase));
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(fetchFail(error.message));
        });
    }
  }
};

export const setBoardSettings = (data) => async (dispatch, getState) => {
  let squareStyles = {};
  let tmpPositions = [];

  let startingCase = getState().board.startingCase;
  let clubs = getState().clubs.clubsResult;

  for (let i in clubs) {
    let club = clubs[i];
    // add style to case
    if (club.position === startingCase.notation) {
      squareStyles[club.position] = startingpointStyle;
    } else {
      squareStyles[club.position] = squareStyle;
    }

    // save position to array
    await dispatch(addPosition(club.position)).then((result) => {
      tmpPositions.push(result);
    });
  }

  dispatch(setPositions(tmpPositions));
  dispatch(setSquareStyles(squareStyles));
};

export const addPosition = (position) => async (dispatch, getState) => {
  let startingCase = getState().board.startingCase;
  let tmp = {};
  tmp.notation = position;
  tmp.row = getRow(position);
  tmp.col = getCol(position);

  if (position === startingCase.notation) {
    tmp.visited = true;

    // update starting case
    let jwt_token = "Bearer " + localStorage.token;
    const config = {
      method: "post",
      url: updateCurrentSquareUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt_token,
      },
      data: {
        currentSquare: tmp,
        participant_id: getState().participant._id
      }
    };

    const response = await axios(config)
      .then((response) => {
        console.log(response.data);
        dispatch(setCurrentSquare(tmp));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(fetchFail(error.message));
      });
  } else {
    tmp.visited = false;
  }

  return tmp;
};

export const updateStyles = () => async (dispatch, getState) => {
  let squareStyles = {};
  let positions = getState().board.positions;
  let currentSquare = getState().board.currentSquare;
  let desiredSquare = getState().board.desiredSquare;

  // change styles of current and starting square
  for (let i in positions) {
    let position = positions[i];
    // if it is the square the user is coming from, make it yellow to indicate that it is illegal:
    if (position.notation === currentSquare.notation)
      squareStyles[position.notation] = illegalCaseStyle;
    // if current sqaure, make it red
    else if (position.notation === desiredSquare.notation)
      squareStyles[position.notation] = currentCaseStyle;
    // if neither illegal nor current, check if it is visited
    else if (position.visited)
      squareStyles[position.notation] = visitedSquareStyle;
    // if it is not visited, remove flag
    else if (!position.visited)
      squareStyles[position.notation] = unvisitedSquareStyle;
  }

  dispatch(setSquareStyles(squareStyles));
};
export const updateStartingCase =
  (currentSquare) => async (dispatch, getState) => {
    dispatch(setStartingCase(currentSquare));
  };

export const swapDesiredToCurrentCase =
  (desiredSquare) => async (dispatch, getState) => {
    let tmp = {};
    // change starting case to current case
    tmp.notation = desiredSquare.notation;
    tmp.row = desiredSquare.row;
    tmp.col = desiredSquare.col;
    tmp.visited = true;

    // swap desired with current
    dispatch(setCurrentSquare(tmp));
  };

export const updateMove = (data) => async (dispatch, getState) => {
  let currentSquare = getState().board.currentSquare;
  let desiredSquare = getState().board.desiredSquare;

  // swap pieces: starting = current
  dispatch(updateStartingCase(currentSquare));
  // swap current and desired
  dispatch(swapDesiredToCurrentCase(desiredSquare));

  // move white king to desiredsquare
  let position = {};
  position[desiredSquare.notation] = "wK";
  dispatch(setStartingPosition(position));
  // change style of the board

  dispatch(updateStyles());

  let jwt_token = "Bearer " + localStorage.token;
  const config = {
    method: "post",
    url: updateMoveUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt_token,
    },
    data: {
      participant_id: data.participant_id,
      club_id: data.club_id,
      piece: data.piece,
      currentSquare: getState().board.currentSquare,
      desiredSquare: getState().board.desiredSquare,
      startingPosition: getState().board.startingPosition,
      squareStyles: getState().board.squareStyles,
    },
  };

  const response = await axios(config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(fetchFail(error.message));
    });

  return response;
};

const { reducer, actions } = boardSlice;
export const {
  setStartingPosition,
  setStartingCase,
  setPositions,
  setSquareStyles,
  setCurrentSquare,
  setDesiredSquare,
  fetchFail,
} = actions;
export default reducer;
