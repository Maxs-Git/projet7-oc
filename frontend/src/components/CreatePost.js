import "../styles/CreatePost.css";
import { postAdded, middlewarePost } from "../app/features/post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function CreatePost() {
  const post = useSelector(postAdded);
  const postObject = post.payload;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [createPost, setCreatePost] = useState(true);
  function userPost(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();

    const data = { title: title, textContent: text };
    dispatch(middlewarePost(data));

    dispatch(postAdded({ title: title, textContent: text }));
  }
  return (
    <div id="postCreator">
      <form id="postCreation">
        <button id="closeForm" onClick={() => setCreatePost(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <input
          type="text"
          name="title"
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        ></input>
        <textarea
          maxLength="300"
          type="textarea"
          name="textZone"
          id="textZone"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="text"
        ></textarea>

        <button
          id="postSubmit"
          type="submit"
          onClick={(event) => {
            userPost(event);
          }}
        >
          post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
