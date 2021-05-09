import { createSlice } from "@reduxjs/toolkit";
import { signInUrl } from "../../constants";
import axios from "axios";

const initState = {
  isLoading: false,
  isAuth: false,
  role: null,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
      state.role = payload;
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const fetchLogin = (data) => async (dispatch, getState) => {
  const config = {
    method: "post",
    url: signInUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      let account = response.data.data.user_info;
      console.log(account);
      dispatch(loginSuccess(response.data.data.role));

      localStorage.setItem("token", response.data.token);
    })
    .catch((error) => {
      dispatch(loginFail(error.response.data.error));
    });

  return response;
};

const { reducer, actions } = loginSlice;
export const { loginPending, loginFail, loginSuccess } = actions;
export default reducer;
