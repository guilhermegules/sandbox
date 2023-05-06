import { combineReducers, configureStore } from "@reduxjs/toolkit";

import token from "./token";
import user from "./user";
import photo from "./photo";
import localStorageMiddleware from "./middleware/local-storage.middleware";

const reducer = combineReducers({ token, user, photo });

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    localStorageMiddleware,
  ],
});
