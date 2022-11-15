import "../styles/Post.css";
import { postComment, postAdded, middlewarePost } from "../app/features/post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useState } from "react";

function CreatePost() {
  const post = useSelector(postAdded);
  const postObject = post.payload;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  function userPost(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();

    const data = { title: title, textContent: text };
    dispatch(middlewarePost(data));

    dispatch(postAdded({ title: title, textContent: text }));
  }
  return (
    <form>
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
    </form>
  );
}

export default CreatePost;
