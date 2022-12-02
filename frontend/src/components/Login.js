import { Link } from "react-router-dom";
import "../styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogin, loginUser } from "../app/features/user";
import { useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userLoad = useSelector((state) => state.user.userLoad);
  console.log(userLoad);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function loginUtilisateur(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();
    // whatever you want to send
    const data = { email: email, password: password };
    dispatch(postLogin(data));
  }

  if (userLoad === "succeeded") {
    dispatch(loginUser());
    navigate("/post");
  }

  return (
    <div id="login-container">
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
        <Link
          to="/Register"
          style={{
            fontWeight: 600,
            textDecoration: "none",
            color: "#FD2D01",
          }}
        >
          {" "}
          enregistrez-vous
        </Link>
      </p>
    </div>
  );
}

export default Login;
