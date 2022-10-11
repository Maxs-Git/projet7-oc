import logo from "../assets/icon-left-font-monochrome-white.png";
import "../styles/Banner.css";
function Banner() {
  return (
    <header>
      <div className="img-banner">
        <img src={logo} alt="Logo de groupomania" />
      </div>

      <div className="button-banner">
        <button>Login</button>
        <button>Register</button>
      </div>
    </header>
  );
}

export default Banner;
