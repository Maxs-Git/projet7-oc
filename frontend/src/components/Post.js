import "../styles/Post.css";
import {
  deletePostMiddleware,
  getPostMiddleware,
  likeReducer,
  dislikeReducer,
  editMyPost,
  likeDislikePostMiddleware,
} from "../app/features/post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditPost from "./EditPost";

function Post() {
  // console.log(postObject);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const postStatus = useSelector((state) => state.post.status);
  const userData = useSelector((state) => state.user);
  const title = useSelector((state) => state.post.postEdit.title);
  const textUpdate = useSelector((state) => state.post.postEdit.textContent);
  const isUpdate = useSelector((state) => state.post.postEdit.isUpdate);
  const myPost = useSelector((state) => state.post.posts);
  const dislikeState = useSelector((state) => state.post.dislikeObject);
  const likeState = useSelector((state) => state.post.likeObject);

  //affiche les posts
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(getPostMiddleware());
    }
  }, [postStatus, dispatch]);

  const [postIdModify, setPostIdModify] = useState("");
  //////////////////////

  //////show mes posts
  function showEditPost(e) {
    e.nativeEvent.stopPropagation();
    e.stopPropagation();
    e.preventDefault();
    setPostIdModify(e.target.dataset["id"]);

    const tryPost = myPost.find((post) => e.target.dataset["id"] === post._id);

    const editObject = {
      title: tryPost.title,
      textContent: tryPost.textContent,
      postId: e.target.dataset["id"],
      postShow: true,
    };
    dispatch(editMyPost(editObject));
  }

  /////////
  function likef(e) {
    const myPostLike = myPost.find(
      (post) => e.currentTarget.dataset["likeid"] === post._id
    );
    const findUserLike = myPostLike.usersLiked.find(
      (userId) => userId === userData.user.userId
    );

    const findUserDislike = myPostLike.usersDisliked.find(
      (userId) => userId === userData.user.userId
    );

    //   if (findUserLike) {
    //     //si il existe
    //     dispatch(
    //       likeReducer({
    //         postId: myPostLike._id,
    //         postUserId: userData.user.userId,
    //         likes: myPostLike.likes - 1,
    //         dislikes: myPostLike.dislikes,
    //         likeStatus: false,
    //       })
    //     );
    //     dispatch(
    //       likeDislikePostMiddleware({
    //         userId: userData.user.userId,
    //         postId: myPostLike._id,
    //         like: 0,
    //       })
    //     );
    //   } else {
    //     //si il existe pas
    //     dispatch(
    //       likeReducer({
    //         postUserId: userData.user.userId,
    //         postId: myPostLike._id,
    //         likes: myPostLike.likes + 1,
    //         dislikes: myPostLike.dislikes,
    //         likeStatus: true,
    //       })
    //     );
    //     dispatch(
    //       likeDislikePostMiddleware({
    //         userId: userData.user.userId,
    //         postId: myPostLike._id,
    //         like: 1,
    //       })
    //     );
    //     if (dislikeState.dislikeStatus) {
    //       dispatch(
    //         dislikeReducer({
    //           postUserId: userData.user.userId,
    //           postId: myPostLike._id,
    //           likes: myPostLike.likes + 1,
    //           dislikes: myPostLike.dislikes - 1,
    //           dislikeStatus: false,
    //         })
    //       );
    //       dispatch(
    //         likeDislikePostMiddleware({
    //           userId: userData.user.userId,
    //           postId: myPostLike._id,
    //           like: 0,
    //         })
    //       );
    //       dispatch(
    //         likeDislikePostMiddleware({
    //           userId: userData.user.userId,
    //           postId: myPostLike._id,
    //           like: 1,
    //         })
    //       );
    //     }
    //   }

    if (findUserDislike) {
      dispatch(
        dislikeReducer({
          postUserId: userData.user.userId,
          postId: myPostLike._id,
          likes: myPostLike.likes + 1,
          dislikes: myPostLike.dislikes - 1,
          dislikeStatus: false,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user.userId,
          postId: myPostLike._id,
          like: 0,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user.userId,
          postId: myPostLike._id,
          like: 1,
        })
      );
    } else if (findUserLike) {
      dispatch(
        likeReducer({
          postId: myPostLike._id,
          postUserId: userData.user.userId,
          likes: myPostLike.likes - 1,
          dislikes: myPostLike.dislikes,
          likeStatus: false,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user.userId,
          postId: myPostLike._id,
          like: 0,
        })
      );
    } else {
      dispatch(
        likeReducer({
          postUserId: userData.user.userId,
          postId: myPostLike._id,
          likes: myPostLike.likes + 1,
          dislikes: myPostLike.dislikes,
          likeStatus: true,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user.userId,
          postId: myPostLike._id,
          like: 1,
        })
      );
    }
  }

  //////////////
  /////dislike
  //////////////////

  function dislikef(e) {
    const myPostDislike = myPost.find(
      (post) => e.currentTarget.dataset["likeid"] === post._id
    );
    const findUserDislike = myPostDislike.usersDisliked.find(
      () => userData.user.userId
    );
    const findUserLike = myPostDislike.usersLiked.find(
      () => userData.user.userId
    );

    // if (findUserDislike) {
    //   //si il existe
    //   dispatch(
    //     dislikeReducer({
    //       postId: myPostDislike._id,
    //       postUserId: userData.user.userId,
    //       likes: myPostDislike.likes,
    //       dislikes: myPostDislike.dislikes - 1,
    //       dislikeStatus: false,
    //     })
    //   );
    //   dispatch(
    //     likeDislikePostMiddleware({
    //       userId: userData.user.userId,
    //       postId: myPostDislike._id,
    //       like: 0,
    //     })
    //   );
    // } else {
    //si il existe pas
    //   dispatch(
    //     dislikeReducer({
    //       postUserId: userData.user.userId,
    //       postId: myPostDislike._id,
    //       likes: myPostDislike.likes,
    //       dislikes: myPostDislike.dislikes + 1,
    //       dislikeStatus: true,
    //     })
    //   );
    //   dispatch(
    //     likeDislikePostMiddleware({
    //       userId: userData.user.userId,
    //       postId: myPostDislike._id,
    //       like: -1,
    //     })
    //   );
    //   if (likeState.likeStatus) {
    //     dispatch(
    //       likeReducer({
    //         postUserId: userData.user.userId,
    //         postId: myPostDislike._id,
    //         likes: myPostDislike.likes - 1,
    //         dislikes: myPostDislike.dislikes + 1,
    //         likeStatus: false,
    //       })
    //     );
    //     dispatch(
    //       likeDislikePostMiddleware({
    //         userId: userData.user.userId,
    //         postId: myPostDislike._id,
    //         like: 0,
    //       })
    //     );
    //     dispatch(
    //       likeDislikePostMiddleware({
    //         userId: userData.user.userId,
    //         postId: myPostDislike._id,
    //         like: -1,
    //       })
    //     );
    //   }
    // }
    if (findUserLike) {
      dispatch(
        likeReducer({
          postUserId: userData.user.userId,
          postId: myPostDislike._id,
          likes: myPostDislike.likes - 1,
          dislikes: myPostDislike.dislikes + 1,
          likeStatus: false,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user.userId,
          postId: myPostDislike._id,
          like: 0,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user.userId,
          postId: myPostDislike._id,
          like: -1,
        })
      );
    } else if (findUserDislike) {
      dispatch(
        dislikeReducer({
          postId: myPostDislike._id,
          postUserId: userData.user.userId,
          likes: myPostDislike.likes,
          dislikes: myPostDislike.dislikes - 1,
          dislikeStatus: false,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user.userId,
          postId: myPostDislike._id,
          like: 0,
        })
      );
    } else {
      dispatch(
        dislikeReducer({
          postUserId: userData.user.userId,
          postId: myPostDislike._id,
          likes: myPostDislike.likes,
          dislikes: myPostDislike.dislikes + 1,
          dislikeStatus: true,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user.userId,
          postId: myPostDislike._id,
          like: -1,
        })
      );
    }
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
          {postIdModify === post._id && isUpdate === true ? (
            <>
              <h2 className="title">{title}</h2>
              <div id="text-zone">
                {textUpdate}
                <img src={post.imageUrl}></img>
              </div>
            </>
          ) : (
            <>
              <h2 className="title">{post.title}</h2>
              <div id="text-zone">
                {post.textContent}
                <img src={post.imageUrl}></img>
              </div>
            </>
          )}
          <div id="button-area">
            <div id="likeDislike-area">
              <button
                id="like"
                data-likeid={post._id}
                onClick={(e) => {
                  likef(e);
                }}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                {post.likes}
              </button>

              <button
                id="dislike"
                data-likeid={post._id}
                onClick={(e) => {
                  dislikef(e);
                }}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
                {post.dislikes}
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
          {postIdModify === post._id ? <EditPost /> : null}
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
