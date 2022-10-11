import { Link } from "react-router-dom";
import "../styles/Register.css";

import React, { useState } from "react";
function Register() {
  //   const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function signUp(event) {
    event.preventDefault();
    console.log(password, email);
  }

  return (
    <div id="container">
      <h1>Register</h1>

      <form onSubmit={signUp}>
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

        <button type="submit" id="register-button">
          sign in
        </button>
      </form>

      <p>
        Deja inscrit?
        <Link to="/Login"> connectez vous</Link>
      </p>
    </div>
  );
}
export default Register;
