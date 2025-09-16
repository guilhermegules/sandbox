import { createGlobalStyle } from "styled-components";
import Newsletter from "./Newsletter";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #0f1924;
    color: #fff;
  }

  button {
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Newsletter />
    </>
  );
}

export default App;
