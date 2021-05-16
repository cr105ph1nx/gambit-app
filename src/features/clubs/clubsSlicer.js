import { createSlice } from "@reduxjs/toolkit";
import { getClubsUrl } from "../../constants";
import axios from "axios";

const initState = {
  isLoading: false,
  clubsResult: [],
  error: "",
};

const clubsSlice = createSlice({
  name: "clubs",
  initialState: initState,
  reducers: {
    fetchPending: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state.clubsResult = payload;
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

export const fetchClubs = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  const config = {
    method: "get",
    url: getClubsUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      dispatch(fetchSuccess(response.data));
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(fetchFail(error.message));
    });

  dispatch(setLoading(false));

  return response;
};

const { reducer, actions } = clubsSlice;
export const { fetchPending, fetchFail, fetchSuccess, setLoading } = actions;
export default reducer;
