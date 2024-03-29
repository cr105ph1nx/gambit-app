import { createSlice } from "@reduxjs/toolkit";
import { signInUrl, getRoleUrl } from "../../constants";
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
      state.isAuth = true;
      state.error = "";
      state.role = payload.role;
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const fetchLogin = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));

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
      dispatch(
        loginSuccess({
          role: response.data.data.role,
        })
      );

      localStorage.setItem("token", response.data.accessToken);
    })
    .catch((error) => {
      dispatch(loginFail(error.response.data.error));
    });

  dispatch(setLoading(false));
  return response;
};

export const fetchRole = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  let jwt_token = "Bearer " + localStorage.token;

  const config = {
    method: "post",
    url: getRoleUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt_token,
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      dispatch(setRole(response.data));
    })
    .catch((error) => {
      dispatch(loginFail(error.response.data.error));
    });

  dispatch(setLoading(false));

  return response;
};

const { reducer, actions } = loginSlice;
export const { loginPending, loginFail, loginSuccess, setLoading, setRole } =
  actions;
export default reducer;
