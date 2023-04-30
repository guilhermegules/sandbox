import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./store/counter";
import { close, open } from "./store/modal";

function App() {
  const { counter, modal } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Count: {counter.total}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>

      <button onClick={() => dispatch(open())}>Open</button>
      <button onClick={() => dispatch(close())}>Close</button>
      {modal ? <h1>Modal is open</h1> : null}
    </div>
  );
}

export default App;
