import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, sum } from "./store/counter";
import { close, open } from "./store/modal";
import Login from "./Login";

function App() {
  const { counter, modal } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Count: {counter}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(sum(10))}>sum 10</button>

      <button onClick={() => dispatch(open())}>Open</button>
      <button onClick={() => dispatch(close())}>Close</button>
      {modal ? <h1>Modal is open</h1> : null}

      <br />
      <hr />

      <Login />
    </div>
  );
}

export default App;
