import "../styles/EditPost.css";
import { editPostMiddleware, editMyPost } from "../app/features/post";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
function EditPost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const showMyPost = useSelector((state) => state.post.postEdit.postShow);
  const postId = useSelector((state) => state.post.postEdit.postId);
  const editTitle = useSelector((state) => state.post.postEdit.title);
  const editText = useSelector((state) => state.post.postEdit.textContent);

  function userPost(e) {
    e.nativeEvent.stopPropagation();
    e.stopPropagation();
    e.preventDefault();
    //on récupere les données que l'utilisateur a rentrer et on les dispatch sous un format qui supporte les images
    if (title === "") {
      setTitle(editTitle);
    }
    if (text === "") {
      setText(editText);
    }

    const dataAndImage = new FormData();
    dataAndImage.append("title", title);
    dataAndImage.append("textContent", text);
    dataAndImage.append("image", image);
    dataAndImage.append("postId", postId);
    dispatch(editPostMiddleware(dataAndImage));
  }
  return (
    <div>
      {showMyPost === true && (
        <form id="postEdit" encType="multipart/form-data">
          <button
            id="closeFormEdit"
            onClick={() => dispatch(editMyPost({ postShow: false }))}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <input
            maxLength="40"
            type="text"
            name="title"
            id="title-edit-input"
            defaultValue={editTitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          ></input>
          <textarea
            maxLength="300"
            type="textarea"
            name="textZone"
            id="textZone-edit"
            defaultValue={editText}
            onChange={(e) => setText(e.target.value)}
            placeholder="text"
          ></textarea>
          <label htmlFor="fileEdit" id="file-edit-label">
            Choose a file
          </label>
          <input
            type="file"
            id="fileEdit"
            name="image"
            accept="image/png, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>

          <button
            id="postSubmitEdit"
            type="submit"
            onClick={(e) => {
              userPost(e);
            }}
          >
            post
          </button>
        </form>
      )}
    </div>
  );
}

export default EditPost;
