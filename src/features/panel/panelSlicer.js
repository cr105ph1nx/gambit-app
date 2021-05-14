import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WIN, LOSS, DRAW, getClubParticipantsUrl, participantClubs,updateWinUrl, updateLossUrl, updateDrawUrl } from "../../constants/index";

const initState = {
  isLoading: false,
  participantsResults: [],
  error: "",
};

const panelSlice = createSlice({
  name: "panel",
  initialState: initState,
  reducers: {
    fetchSuccess: (state, { payload }) => {
      state.error = "";
      state.participantsResults = payload;
    },
    fetchFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    fetchSuccessUpdate: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const fetchClubParticipants = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  const config = {
    method: "get",
    url: getClubParticipantsUrl + `/${getState().admin.club_id}`
  };

  const response = await axios(config)
    .then((response) => {
      dispatch(fetchSuccess(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchFail(error));
    });

  dispatch(setLoading(false));
  return response;
};


export const updateResult = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  let jwt_token = "Bearer " + localStorage.token;

  let newUrl = participantClubs;
  if(data.result === WIN){
    newUrl = participantClubs + updateWinUrl
  }else if(data.result === LOSS){
    newUrl = participantClubs + updateLossUrl
  }else if(data.result === DRAW){
    newUrl = participantClubs + updateDrawUrl
  }
  
  // data = points
  const config = {
    method: "post",
    url: newUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt_token,
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      dispatch(fetchSuccessUpdate(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchFail(error));
    });

  dispatch(setLoading(false));

  return response;
};

const { reducer, actions } = panelSlice;
export const { fetchPending, fetchFail, fetchSuccess, setLoading, fetchSuccessUpdate } = actions;
export default reducer;
