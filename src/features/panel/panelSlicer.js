import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getClubParticipantClubsUrl } from "../../constants/index";

const initState = {
  isLoading: false,
  participantsResults: null,
  error: "",
};

const panelSlice = createSlice({
  name: "panel",
  initialState: initState,
  reducers: {
    fetchPending: (state) => {
      state.isLoading = true;
    },
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
  },
});

export const fetchClubParticipants = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  console.log("GET DATA", data);

  let newUrl = getClubParticipantClubsUrl + `/:${data.club_id}`;

  const config = {
    method: "get",
    url: newUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      console.log("RESPONSE DATA", response.data);
      dispatch(fetchSuccess(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchFail(error));
    });

  dispatch(setLoading(false));
  return response;
};

const { reducer, actions } = panelSlice;
export const { fetchPending, fetchFail, fetchSuccess, setLoading } = actions;
export default reducer;
