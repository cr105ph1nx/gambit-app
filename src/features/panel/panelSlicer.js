import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getClubParticipantsUrl } from "../../constants/index";

const initState = {
  isLoading: false,
  participantsResults: [],
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

const { reducer, actions } = panelSlice;
export const { fetchPending, fetchFail, fetchSuccess, setLoading } = actions;
export default reducer;
