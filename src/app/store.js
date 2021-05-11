import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlicer";
import participantReducer from "../features/board/participantSlicer";
import adminReducer from "../features/panel/panelSlicer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    participant: participantReducer,
    admin: adminReducer,
  },
});
