import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlicer";
import participantReducer from "../features/participant/participantSlicer";
import adminReducer from "../features/admin/adminSlicer";
import clubsReducer from "../features/clubs/clubsSlicer";
import boardReducer from "../features/board/boardSlicer";
import panelReducer from "../features/panel/panelSlicer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    participant: participantReducer,
    admin: adminReducer,
    clubs: clubsReducer,
    board: boardReducer,
    panel: panelReducer,
  },
});
