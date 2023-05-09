import React from "react";
import { useDispatch } from "react-redux";
import { addDates } from "./store/date";

function App() {
  const [departure, setDeparture] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addDates({ departure, return: returnDate }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="departure">Departure</label>
        <input
          type="date"
          name="departure"
          id="departure"
          value={departure}
          onChange={({ target }) => setDeparture(target.value)}
        />
      </p>
      <p>
        <label htmlFor="return">Return</label>
        <input
          type="date"
          name="return"
          id="return"
          value={returnDate}
          onChange={({ target }) => setReturnDate(target.value)}
        />
      </p>
      <button>Submit</button>
    </form>
  );
}

export default App;
