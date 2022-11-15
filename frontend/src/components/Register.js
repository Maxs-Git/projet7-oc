import { Link } from "react-router-dom";
import "../styles/Register.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postRegister, registerUser } from "../app/features/user";
import axios from "axios";
// import { signup } from "../../../backend/controllers/User";

function Register() {
  const dispatch = useDispatch();
  //   const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  function signUp(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();
    // whatever you want to send
    const data = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    };
    dispatch(postRegister(data));

    dispatch(
      registerUser({
        name: name,
        lastName: lastName,
        password: password,
        email: email,
      })
    );
  }

  return (
    <div id="container">
      <h1>Register</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="prénom"
        />
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nom"
        />
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
          type="submit"
          id="register-button"
          onClick={(event) => {
            signUp(event);
          }}
        >
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
