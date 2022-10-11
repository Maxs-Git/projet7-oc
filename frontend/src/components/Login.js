import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  return (
    <div id="container">
      <h1>Login</h1>

      <form>
        <input id="email" type="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Password" />

        <button id="login-button">Login</button>
      </form>

      <p>
        Pas inscrit
        <Link to="/Register"> enregistrez-vous</Link>
      </p>
    </div>
  );
}

export default Login;
