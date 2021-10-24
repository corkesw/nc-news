import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Contexts/User";
import "../../Css/Login.css";
import { getUsers } from "../../utils/api";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [userInput, setUserInput] = useState("jessjelly");
  const [err, setErr] = useState(null);
  const handleLogin = (e) => {
    e.preventDefault();
    setErr(null);
    getUsers(userInput).then((res) => {
      if (res) {
        setUser(userInput);
        localStorage.setItem("loggedInUser", userInput);
        setUserInput("");
      } else setErr("User not found");
    });
  };

  return (
    <div className="login">
      <form className="loginform" onSubmit={handleLogin}>
        <label htmlFor="username" name="username"></label>
        <input
          onChange={(e) => {
            setErr(null);
            setUserInput(e.target.value);
          }}
          value={userInput}
          type="text"
          name="username"
          placeholder="username"
        ></input>
        <button>Login</button>
        <br />
        {err ? <p className="errormessage">{err}</p> : null}
        {user ? <p>You are logged in as {user}</p> : null}
      </form>
      <span className="spacer"></span>
    </div>
  );
};

export default Login;
