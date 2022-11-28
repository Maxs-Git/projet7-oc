import "../styles/EditPost.css";
import { editPostMiddleware, editMyPost } from "../app/features/post";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
function EditPost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const showMyPost = useSelector((state) => state.post.postEdit.postShow);
  const postId = useSelector((state) => state.post.postEdit.postId);
  const editTitle = useSelector((state) => state.post.postEdit.title);
  const editText = useSelector((state) => state.post.postEdit.textContent);

  function userPost(e) {
    e.nativeEvent.stopPropagation();
    e.stopPropagation();
    e.preventDefault();

    const data = {
      title: title,
      textContent: text,
      imageUrl: image,
      postId: postId,
    };
    dispatch(
      editMyPost({
        postId:postId,
        postShow: false,
        title: title,
        textContent: text,
        isUpdate: true,
      })
    );
    dispatch(editPostMiddleware(data));
  }
  return (
    <div>
      {showMyPost === true && (
        <form id="postEdit">
          <button
            id="closeFormEdit"
            onClick={() => dispatch(editMyPost({ postShow: false }))}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <input
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
