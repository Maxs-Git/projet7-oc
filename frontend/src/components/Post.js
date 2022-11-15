import "../styles/Post.css";
import Banner from "./Banner";
import { postComment, postAdded, middlewarePost } from "../app/features/post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
function Post() {
  const post = useSelector(postAdded);
  const postObject = post.payload;
  // const dispatch = useDispatch();
  // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");

  // function userPost(event) {
  //   event.nativeEvent.stopPropagation();
  //   event.stopPropagation();
  //   event.preventDefault();

  //   const data = { title: title, textContent: text };
  //   dispatch(middlewarePost(data));

  //   dispatch(postAdded({ title: title, textContent: text }));
  // }
  return (
    <div>
      <Banner />
      {/* <form>
        <label for="title">Titre:</label>
        <input
          type="text"
          name="title"
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        ></input>
        <input
          type="text"
          name="textZone"
          id="textZone"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Email"
        ></input>

        <button
          id="login-button"
          type="submit"
          onClick={(event) => {
            userPost(event);
          }}
        >
          post
        </button>
      </form> */}
      {postObject.post.map((post, index) => (
        <div className="postcontainer">
          <div id="name-area">
            <p>nomtest</p>
            <p>prenomtest</p>
          </div>
          <h2 class="title">{post.title}</h2>
          <div id="text-area">{post.textContent}</div>
          <div id="button-area">
            <div id="likeDislike-area">
              <button id="like">
                <FontAwesomeIcon icon={faThumbsUp} /> <span>{post.like}</span>
              </button>
              <button id="dislike">
                <FontAwesomeIcon icon={faThumbsDown} />{" "}
                <span>{post.dislike}</span>
              </button>
            </div>
            <div id="technic-button">
              <button id="modif">modifier</button>
              <button id="delete">supprimer</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
