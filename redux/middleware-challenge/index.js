import { fetchToken } from "./api/token.js";
import { fetchUser } from "./api/user.js";
import store from "./store/store.js";

const login = async (user) => {
  let state = store.getState();

  if (state.token.data === null) {
    await store.dispatch(fetchToken(user));
  }

  state = store.getState();
  await store.dispatch(fetchUser(state.token.data));
};

const user = {
  username: "dog",
  password: "dog",
};

login(user);
