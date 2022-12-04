import { Link } from "react-router-dom";
import "../styles/Register.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../app/features/user";

function Register() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  function signUp(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();
    const data = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    };
    dispatch(postRegister(data));

    navigate("/login");
  }

  return (
    <div id="register-container">
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
        <div className="email error"></div>
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
        <Link
          to="/Login"
          style={{
            fontWeight: 600,
            textDecoration: "none",
            color: "#FD2D01",
          }}
        >
          connectez vous
        </Link>
      </p>
    </div>
  );
}

export default Register;
