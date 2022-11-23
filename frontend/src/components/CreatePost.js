import "../styles/CreatePost.css";
import { postAdded, middlewarePost } from "../app/features/post";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [createPost, setCreatePost] = useState(true);
  const userData = useSelector((state) => state.user);
  function userPost(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();

    const data = {
      name: userData.user.name,
      lastName: userData.user.lastName,
      title: title,
      textContent: text,
      imageUrl: image,
    };
    dispatch(middlewarePost(data));

    dispatch(
      postAdded({
        name: userData.user.name,
        lastName: userData.user.lastName,
        title: title,
        textContent: text,
        imageUrl: image,
      })
    );
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

        <input
          type="file"
          id="file"
          accept="image/png, image/jpeg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>

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
