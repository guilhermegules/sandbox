// Constants
const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";

// Action creator
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// Initial state
const initialState = 0;

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default reducer;
