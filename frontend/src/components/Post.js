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
import CreatePost from "./CreatePost";

function Post() {
  // console.log(postObject);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.post.status);
  const userData = useSelector((state) => state.user);
  const title = useSelector((state) => state.post.postEdit.title);
  const textUpdate = useSelector((state) => state.post.postEdit.textContent);
  const isUpdate = useSelector((state) => state.post.postEdit.isUpdate);
  const imageUpdate = useSelector((state) => state.post.postEdit.imageUrl);
  const myPost = useSelector((state) => state.post.posts);
  const myPostRender = useSelector((state) => state.post.posts);
  const [deleteId, setDeleteId] = useState("");
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

    const postBeforeEdit = myPost.find(
      (post) => e.target.dataset["id"] === post._id
    );

    const editObject = {
      postId: e.target.dataset["id"],
      title: postBeforeEdit.title,
      textContent: postBeforeEdit.textContent,
      imageUrl: postBeforeEdit.imageUrl,
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
    if (findUserDislike) {
      dispatch(
        likeReducer({
          postUserId: userData.user.userId,
          postId: myPostLike._id,
          likes: myPostLike.likes + 1,
          dislikes: myPostLike.dislikes - 1,
          dislikeStatus: false,
          likeStatus: true,
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
    } else {
      dispatch(
        likeReducer({
          postUserId: userData.user.userId,
          postId: myPostLike._id,
          likes: myPostLike.likes + 1,
          dislikes: myPostLike.dislikes,
          likeStatus: true,
          dislikeStatus: false,
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
      (userId) => userId === userData.user.userId
    );
    const findUserLike = myPostDislike.usersLiked.find(
      (userId) => userId === userData.user.userId
    );
    if (findUserLike) {
      dispatch(
        dislikeReducer({
          postUserId: userData.user.userId,
          postId: myPostDislike._id,
          likes: myPostDislike.likes - 1,
          dislikes: myPostDislike.dislikes + 1,
          likeStatus: false,
          dislikeStatus: true,
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
    } else {
      dispatch(
        dislikeReducer({
          postUserId: userData.user.userId,
          postId: myPostDislike._id,
          likes: myPostDislike.likes,
          dislikes: myPostDislike.dislikes + 1,
          dislikeStatus: true,
          likeStatus: false,
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
    dispatch(deletePostMiddleware(e.target.dataset["delete"]));
    dispatch(deletePost());
  }

  const sortAllPost = myPostRender
    .slice()
    .sort((a, b) => b.orderDate.localeCompare(a.orderDate));

  return (
    <div>
      <CreatePost />
      {sortAllPost.map((post, index) => (
        <div className="postcontainer" key={post._id}>
          <div id="name-area">
            <p>{post.name}</p>
            <p>{post.lastName}</p>
          </div>
          {postIdModify === post._id && isUpdate === true ? (
            <>
              <h2 className="title">{title}</h2>
              <div id="text-zone">
                <p>{textUpdate}</p>
                {post.imageUrl === "null" ? null : (
                  <img src={imageUpdate} alt={post.name + "image"}></img>
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="title">{post.title}</h2>
              <div id="text-zone">
                <p>{post.textContent}</p>
                {post.imageUrl === "null" ? null : (
                  <img src={post.imageUrl} alt={post.name + "image"}></img>
                )}
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
                  data-delete={post._id}
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
