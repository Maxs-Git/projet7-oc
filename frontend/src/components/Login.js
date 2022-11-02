import { Link } from "react-router-dom";
import "../styles/Login.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../app/features/user";

function Login() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function loginUtilisateur(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();
    dispatch(loginUser({ password: password, email: email }));
  }
  return (
    <div id="container">
      <h1>Login</h1>

      <form>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          id="login-button"
          type="submit"
          onClick={(event) => {
            loginUtilisateur(event);
          }}
        >
          login
        </button>
      </form>

      <p>
        Pas inscrit
        <Link to="/Register"> enregistrez-vous</Link>
      </p>
    </div>
  );
}

export default Login;
