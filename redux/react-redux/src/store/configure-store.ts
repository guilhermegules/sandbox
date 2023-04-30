import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter from "./counter";
import modal from "./modal";
import { logger } from "./middleware/logger";

const reducer = combineReducers({ counter, modal });
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
