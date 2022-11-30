import logo from "../assets/icon-left-font-monochrome-white.png";
import "../styles/Banner.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function disconnectUser() {
  window.location.replace("http://localhost:3000/login");
  localStorage.clear();
}

function Banner() {
  const userData = useSelector((state) => state.user);
  return (
    <header>
      <div className="img-banner">
        <img src={logo} alt="Logo de groupomania" />
      </div>

      <div className="button-banner">
        {userData.loggedIn === false ? (
          <>
            <button>
              <Link to="/Login"> Login</Link>
            </button>

            <button>
              <Link to="/Register"> Register</Link>
            </button>
          </>
        ) : (
          <>
            <h1 id="welcome">Bienvenue {userData.user.name}</h1>
            <button
              onClick={(e) => {
                disconnectUser(e);
              }}
            >
              Se deconnecter
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Banner;
