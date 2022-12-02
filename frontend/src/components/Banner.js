import logo from "../assets/icon-left-font-monochrome-white.svg";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            {/* <button>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "black",
                }}
                to="/Login"
              >
                Login
              </Link>
            </button>

            <button>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "black",
                  ":hover": { color: "white" },
                }}
                to="/Register"
              >
                Register
              </Link>
            </button> */}
          </>
        ) : (
          <>
            <h1 id="welcome">
              <span className="white">Bienvenue</span> {userData.user.name}
            </h1>
            <button
              className="Disconnect"
              onClick={(e) => {
                disconnectUser(e);
              }}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Banner;
