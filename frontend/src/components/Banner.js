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
  return (
    <>
      <header>
        <div className="img-banner">
          <img src={logo} alt="Logo de groupomania" />
        </div>

        <div className="button-banner">
          {userData.loggedIn === false ? (
            <></>
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
