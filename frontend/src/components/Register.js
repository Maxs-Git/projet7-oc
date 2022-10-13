import { Link } from "react-router-dom";
import "../styles/Register.css";
import axios from "axios";
import React, { useState } from "react";
function Register() {
  //   const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function signUp(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3300/api/auth/signup", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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

// axios.get('http://localhost:3000/api/auth/signup')
//   .then(function (response) {
//     // en cas de réussite de la requête
//     console.log(response);
//   })
//   .catch(function (error) {
//     // en cas d’échec de la requête
//     console.log(error);
//   })
//   .then(function () {
//     // dans tous les cas
//   });

export default Register;
