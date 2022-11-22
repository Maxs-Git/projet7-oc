import "../styles/Post.css";
import {
  deletePostMiddleware,
  getPostMiddleware,
  likeDislikePostMiddleware,
} from "../app/features/post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../app/features/user";
import { useState } from "react";
import EditPost from "./EditPost";

function Post() {
  // console.log(postObject);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const postStatus = useSelector((state) => state.post.status);
  const userData = useSelector((state) => state.user);

  function dislike() {
    dispatch(
      likeDislikePostMiddleware({
        UsersDislike: localStorage.getItem("userId"),
        dislike: +1,
      })
    );
  }

  //affiche les posts
  useEffect(() => {
    dispatch(getUser());
    if (postStatus === "idle") {
      dispatch(getPostMiddleware());
    }
  }, [postStatus, dispatch]);

  const [postId, setPostId] = useState("");

  const [editPost, setEditPost] = useState(false);
  function toLocalStorage() {
    localStorage.setItem("postId", postId);
  }
  toLocalStorage();

  function deletePost() {
    dispatch(deletePostMiddleware());
  }

  return (
    <div>
      {post.posts.map((post, index) => (
        <div className="postcontainer" id={post.userId} key={post._id}>
          <div id="name-area">
            <p>{post.name}</p>
            <p>{post.lastName}</p>
          </div>
          <h2 className="title">{post.title}</h2>
          <div id="text-zone">
            {post.textContent}
            {post.imageUrl}
          </div>
          <div id="button-area">
            <div id="likeDislike-area">
              <button
                id="like"
                onClick={(e) => {
                  dislike(e)(setPostId(e.target.value));
                }}
              >
                <FontAwesomeIcon icon={faThumbsUp} /> <span>{post.like}</span>
              </button>
              <button id="dislike">
                <FontAwesomeIcon icon={faThumbsDown} />
                <span>{post.dislike}</span>
              </button>
            </div>
            {userData.user._id === post.userId && (
              <div id="technic-button">
                <button
                  value={post._id}
                  id="modif"
                  onClick={(e) => {
                    setPostId(e.target.value)(setEditPost(true));
                  }}
                >
                  modifier
                </button>
                <button
                  value={post._id}
                  onClick={(e) => {
                    setPostId(e.target.value) (deletePost());
                  }}
                  id="delete"
                >
                  supprimer
                </button>
              </div>
            )}
          </div>
          {editPost ? <EditPost /> : null}
        </div>
      ))}
    </div>
  );
}

export default Post;

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

// {/* <form>
//       <label for="title">Titre:</label>
//       <input
//         type="text"
//         name="title"
//         id="title-input"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="title"
//       ></input>
//       <input
//         type="text"
//         name="textZone"
//         id="textZone"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Email"
//       ></input>

//       <button
//         id="login-button"
//         type="submit"
//         onClick={(event) => {
//           userPost(event);
//         }}
//       >
//         post
//       </button>
//     </form> */}
