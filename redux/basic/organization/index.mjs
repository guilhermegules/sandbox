import "./redux.min.mjs";
import { decrement, increment } from "./counter.mjs";
import store from "./configure-store.mjs";

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
