import { createSlice } from "@reduxjs/toolkit";
import { getParticipantUrl } from "../../constants";
import axios from "axios";

const initState = {
  isLoading: false,
  _id: "",
  email: "",
  username: "",
  startingpoint: null,
  pendingAuthorization: true,
  score: 0,
  flagsRemaining: null,
  arsenal: [],
  positions: [],

  error: "",
};

const participantSlice = createSlice({
  name: "participant",
  initialState: initState,
  reducers: {
    fetchPending: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state._id = payload._id;
      state.email = payload.email;
      state.username = payload.username;
      state.startingpoint = payload.startingpoint;
      state.pendingAuthorization = payload.pendingAuthorization;
      state.score = payload.score;
      state.flagsRemaining = payload.flagsRemaining;
      state.arsenal = payload.arsenal;
    },
    fetchFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setPositions: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const fetchParticipant = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  let jwt_token = "Bearer " + localStorage.token;

  const config = {
    method: "post",
    url: getParticipantUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt_token,
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      dispatch(
        fetchSuccess({
          _id: response.data._id,
          email: response.data.email,
          username: response.data.username,
          startingpoint: response.data.startingpoint,
          pendingAuthorization: response.data.pendingAuthorization,
          score: response.data.score,
          flagsRemaining: response.data.flagsRemaining,
          arsenal: response.data.arsenal,
        })
      );
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(fetchFail(error.message));
    });

  
  dispatch(setLoading(false));

  return response;
};

const { reducer, actions } = participantSlice;
export const { fetchPending, fetchFail, fetchSuccess, setLoading } = actions;
export default reducer;
