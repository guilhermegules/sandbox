import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter from "./counter";
import modal from "./modal";
import login from "./login";
import { logger } from "./middleware/logger";

const reducer = combineReducers({ counter, modal, login });
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
