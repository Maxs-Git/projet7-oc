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
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.post.status);
  const userData = useSelector((state) => state.user);
  const myPost = useSelector((state) => state.post.posts);
  const myPostRender = useSelector((state) => state.post.posts);

  //affiche les posts
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(getPostMiddleware());
    }
  }, [postStatus, dispatch]);

  const [postIdModify, setPostIdModify] = useState("");

  //affiche le rendu édité d'un post
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

  /////////function de like
  function likef(e) {
    //compare l'id du post que l'on veut like
    const myPostLike = myPost.find(
      (post) => e.currentTarget.dataset["likeid"] === post._id
    );

    //regarde dans le array du like voir si notre utilisateur n'est pas dedans
    const findUserLike = myPostLike.usersLiked.find(
      (userId) => userId === userData.user._id
    );
    //regarde dans le array du dislike voir si notre utilisateur n'est pas dedans
    const findUserDislike = myPostLike.usersDisliked.find(
      (userId) => userId === userData.user._id
    );
    if (findUserDislike) {
      dispatch(
        likeReducer({
          //si il est dans le array de dislike on le retire et l'ajoute dans celui du like
          postUserId: userData.user._id,
          postId: myPostLike._id,
          likes: myPostLike.likes + 1,
          dislikes: myPostLike.dislikes - 1,
          dislikeStatus: false,
          likeStatus: true,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user._id,
          postId: myPostLike._id,
          like: 0,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user._id,
          postId: myPostLike._id,
          like: 1,
        })
      );
    } else if (findUserLike) {
      //si l'user a deja liké un post on le retire
      dispatch(
        likeReducer({
          postId: myPostLike._id,
          postUserId: userData.user._id,
          likes: myPostLike.likes - 1,
          dislikes: myPostLike.dislikes,
          likeStatus: false,
          dislikeStatus: false,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user._id,
          postId: myPostLike._id,
          like: 0,
        })
      );
    } else {
      //si il ne la pas liké on l'ajoute
      dispatch(
        likeReducer({
          postUserId: userData.user._id,
          postId: myPostLike._id,
          likes: myPostLike.likes + 1,
          dislikes: myPostLike.dislikes,
          likeStatus: true,
          dislikeStatus: false,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user._id,
          postId: myPostLike._id,
          like: 1,
        })
      );
    }
  }

  /////dislike
  function dislikef(e) {
    const myPostDislike = myPost.find(
      (post) => e.currentTarget.dataset["likeid"] === post._id
    );
    const findUserDislike = myPostDislike.usersDisliked.find(
      (userId) => userId === userData.user._id
    );
    const findUserLike = myPostDislike.usersLiked.find(
      (userId) => userId === userData.user._id
    );
    if (findUserLike) {
      dispatch(
        dislikeReducer({
          postUserId: userData.user._id,
          postId: myPostDislike._id,
          likes: myPostDislike.likes - 1,
          dislikes: myPostDislike.dislikes + 1,
          likeStatus: false,
          dislikeStatus: true,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user._id,
          postId: myPostDislike._id,
          like: 0,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user._id,
          postId: myPostDislike._id,
          like: -1,
        })
      );
    } else if (findUserDislike) {
      dispatch(
        dislikeReducer({
          postId: myPostDislike._id,
          postUserId: userData.user._id,
          likes: myPostDislike.likes,
          dislikes: myPostDislike.dislikes - 1,
          dislikeStatus: false,
          likeStatus: false,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user._id,
          postId: myPostDislike._id,
          like: 0,
        })
      );
    } else {
      dispatch(
        dislikeReducer({
          postUserId: userData.user._id,
          postId: myPostDislike._id,
          likes: myPostDislike.likes,
          dislikes: myPostDislike.dislikes + 1,
          dislikeStatus: true,
          likeStatus: false,
        })
      );
      dispatch(
        likeDislikePostMiddleware({
          userId: userData.user._id,
          postId: myPostDislike._id,
          like: -1,
        })
      );
    }
  }

  //suprimes les posts
  function deletePost(e) {
    dispatch(deletePostMiddleware(e.target.dataset["delete"]));
  }

  //tri les posts par dates
  const sortAllPost = myPostRender
    .slice()
    .sort((a, b) => b.orderDate.localeCompare(a.orderDate));

  //affiche le rendu css html
  return (
    <div>
      <CreatePost />
      {sortAllPost.map((post, index) => (
        <div className="postcontainer" key={post._id}>
          <div className="name-area">
            <p>{post.name}</p>
            <p>{post.lastName}</p>
          </div>
          <h2 className="title">{post.title}</h2>
          <div className="text-zone">
            <p>{post.textContent}</p>
            {post.imageUrl === "" ? null : (
              <img src={post.imageUrl} alt={post.name + "image"}></img>
            )}
          </div>

          <div className="button-area">
            <div className="likeDislike-area">
              <button
                className="like"
                data-likeid={post._id}
                onClick={(e) => {
                  likef(e);
                }}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                {post.likes}
              </button>

              <button
                className="dislike"
                data-likeid={post._id}
                onClick={(e) => {
                  dislikef(e);
                }}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
                {post.dislikes}
              </button>
            </div>
            {userData.user.role === true ? (
              <div className="technic-button">
                <button
                  data-id={post._id}
                  className="modif"
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
                  className="delete"
                >
                  supprimer
                </button>
              </div>
            ) : (
              userData.user._id === post.userId && (
                <div className="technic-button">
                  <button
                    data-id={post._id}
                    className="modif"
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
                    className="delete"
                  >
                    supprimer
                  </button>
                </div>
              )
            )}
          </div>
          {postIdModify === post._id ? <EditPost /> : null}
        </div>
      ))}
    </div>
  );
}

export default Post;
