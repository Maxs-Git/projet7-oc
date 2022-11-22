import "../styles/EditPost.css";
import { editPostMiddleware } from "../app/features/post";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function EditPost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [editPost, setEditPost] = useState(true);
  const [postId, setPostId] = useState("");
  function userPost(event) {
    event.nativeEvent.stopPropagation();
    event.stopPropagation();
    event.preventDefault();

    const data = { title: title, textContent: text, imageUrl: image };
    dispatch(editPostMiddleware(data));
  }
  return (
    <div>
      <form id="postEdit" enctype="multipart/form-data">
        <button id="closeFormEdit" onClick={() => setEditPost(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <input
          type="text"
          name="title"
          id="title-edit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        ></input>
        <textarea
          maxLength="300"
          type="textarea"
          name="textZone"
          id="textZone-edit"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="text"
        ></textarea>

        <input
          type="file"
          id="fileEdit"
          accept="image/png, image/jpeg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>

        <button
          id="postSubmitEdit"
          type="submit"
          onClick={(e) => {
            userPost(e)(setEditPost(false));
          }}
        >
          post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
