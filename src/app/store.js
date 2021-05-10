import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import loginReducer from "../features/login/loginSlicer";
import participantReducer from "../features/board/boardSlicer";
import adminReducer from "../features/panel/panelSlicer";

const reducers = combineReducers({
  login: loginReducer,
  participant: participantReducer,
  admin: adminReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
