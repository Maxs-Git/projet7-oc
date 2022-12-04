import { Outlet } from "react-router-dom";
import logo from "../assets/icon-left-font-monochrome-white.svg";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Banner.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../app/features/user";

//deconnect notre utilisateur si il est co

function disconnectUser() {
  window.location.replace("http://localhost:3000/login");
  localStorage.clear();
}

function Banner() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const userData = useSelector((state) => state.user);
  console.log(userData);
  return (
    <>
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
      {userData.loggedIn && <Outlet />}
    </>
  );
}

export default Banner;
