import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, login } from "./store/login";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { data } = useSelector((state: any) => state.login.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(autoLogin() as any);
  }, [dispatch]);

  function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    dispatch(login({ username, password }) as any);
  }

  return (
    <form>
      <label style={{ display: "block" }} htmlFor="username">
        User
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />

      <label style={{ display: "block" }} htmlFor="password">
        Pass
      </label>
      <input
        type="text"
        id="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />

      <button onClick={(event) => handleSubmit(event)}>submit</button>

      <pre>{data ? JSON.stringify(data) : null}</pre>
    </form>
  );
};

export default Login;
