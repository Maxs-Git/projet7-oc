import logo from "../assets/icon-left-font-monochrome-white.png";
import "../styles/Banner.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreatePost from "./CreatePost";
function Banner() {
  const token = localStorage.getItem("token");

  const [createPost, setCreatePost] = useState(false);
  return (
    <header>
      <div className="img-banner">
        <img src={logo} alt="Logo de groupomania" />
      </div>

      <div className="button-banner">
        <button>
          <Link to="/Login"> Login</Link>
        </button>
        <button>
          <Link to="/Register"> Register</Link>
        </button>
        {/* {loggedIn =  true ? ( */}
        <button>
          <Link onClick={() => setCreatePost(true)}>ajouter un post</Link>
        </button>
        {/* // )} */}
        {/* <button>Se deconnecter</button>
        <button>Ajouter un post</button> */}
      </div>
      {createPost ? <CreatePost /> : null}
    </header>
  );
}

export default Banner;
