import { useDispatch, useSelector } from "react-redux";
import Connect from "./Connect";

function App() {
  const state = useSelector<number, number>((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Count: {state}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>

      <Connect />
    </div>
  );
}

export default App;
