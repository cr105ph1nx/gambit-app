import { createSlice } from "@reduxjs/toolkit";
import { getAdminUrl } from "../../constants";
import axios from "axios";

const initState = {
  isLoading: false,
  email: "",
  username: "",
  club_id: "",
  error: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initState,
  reducers: {
    fetchPending: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state.email = payload.email;
      state.username = payload.username;
      state.club_id = payload.club_id;
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

export const fetchData = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  let jwt_token = "Bearer " + localStorage.token;

  const config = {
    method: "post",
    url: getAdminUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt_token,
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      console.log(response);
      dispatch(
        fetchSuccess({
          email: response.data.email,
          username: response.data.username,
          club_id: response.data.club_id,
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

const { reducer, actions } = adminSlice;
export const { fetchPending, fetchFail, fetchSuccess, setLoading } = actions;
export default reducer;
