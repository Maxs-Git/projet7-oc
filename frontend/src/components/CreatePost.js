import "../styles/CreatePost.css";
import { middlewarePost } from "../app/features/post";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useSelector } from "react-redux";
function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const userData = useSelector((state) => state.user);
  function userPost(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();
    const dataAndImage = new FormData();
    console.log(image);
    dataAndImage.append("name", userData.user.name);
    dataAndImage.append("lastName", userData.user.lastName);
    dataAndImage.append("title", title);
    dataAndImage.append("textContent", text);
    dataAndImage.append("image", image);

    dispatch(middlewarePost(dataAndImage));

    setTitle("");
    setText("");
    setImage();
  }
  return (
    <div id="postCreator">
      <form id="postCreation" encType="multipart/form-data">
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

        <label for="file" id="file-upload-label">
          Choose a file
        </label>
        <input
          type="file"
          id="file"
          accept="image/png, image/jpeg"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />

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
