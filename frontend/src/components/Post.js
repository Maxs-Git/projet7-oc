import "../styles/Post.css";
import {
  deletePostMiddleware,
  getPostMiddleware,
  likeDislikePostMiddleware,
  editMyPost,
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

  //affiche les posts
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(getPostMiddleware());
    }
  }, [postStatus, dispatch]);

  const [postId, setPostId] = useState("");

  function dislike() {
    dispatch(
      likeDislikePostMiddleware({
        UsersDislike: localStorage.getItem("userId"),
        dislike: +1,
      })
    );
  }

  function showEditPost(e) {
    e.nativeEvent.stopPropagation();
    e.stopPropagation();
    e.preventDefault();

    setPostId(e.target.dataset["id"]);

    const editObject = { postId: e.target.dataset["id"], postShow: true };

    dispatch(editMyPost(editObject));
  }

  function deletePost(e) {
    dispatch(deletePostMiddleware(e.target.dataset["id"]));
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
            <img src={post.imageUrl}></img>
          </div>
          <div id="button-area">
            <div id="likeDislike-area">
              <button id="like">
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{post.like}</span>
              </button>
              <button id="dislike">
                <FontAwesomeIcon icon={faThumbsDown} />
                <span>{post.dislike}</span>
              </button>
            </div>
            {userData.user.userId === post.userId && (
              <div id="technic-button">
                <button
                  data-id={post._id}
                  id="modif"
                  onClick={(e) => {
                    showEditPost(e);
                  }}
                >
                  modifier
                </button>
                <button
                  data-id={post._id}
                  onClick={(e) => {
                    deletePost(e);
                  }}
                  id="delete"
                >
                  supprimer
                </button>
              </div>
            )}
          </div>
          {postId === post._id ? <EditPost /> : null}
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
