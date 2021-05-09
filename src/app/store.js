import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlicer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
