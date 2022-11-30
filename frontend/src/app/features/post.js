import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  postEdit: { title: "", lastname: null, postId: null },
  likeObject: {},
  dislikeObject: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.posts.push(action.payload);
    },
    postAdded: (state, action) => {
      state.posts.push(action.payload);
    },
    editMyPost: (state, action) => {
      state.postEdit = action.payload;
      const findMyPost = state.posts.find(
        (post) => post._id === state.postEdit.postId
      );
      if (findMyPost) {
        console.log(state.postUpdate);
        findMyPost.title = state.postEdit.title;
        findMyPost.textContent = state.postEdit.textContent;
        findMyPost.imageUrl = state.postEdit.imageUrl;
      }
    },
    deletePost: (state, action) => {
      console.log(action.payload);
      const deleteIndex = state.posts.findIndex(
        (deletePost) => deletePost === state.posts.deleteOne
      );
      state.posts.splice(deleteIndex, 1);
    },
    likeReducer: (state, action) => {
      state.likeObject = action.payload;
      const likeUserExist = state.posts.find(
        (likeUser) => likeUser._id === state.likeObject.postId
      );
      if (likeUserExist) {
        likeUserExist.likes = state.likeObject.likes;
        likeUserExist.dislikes = state.likeObject.dislikes;
        likeUserExist.likeStatus = state.likeObject.likeStatus;
        likeUserExist.dislikeStatus = state.likeObject.dislikeStatus;
        if (likeUserExist.likeStatus) {
          likeUserExist.usersLiked.push(state.likeObject.postUserId);
          const myIndexDislike = likeUserExist.usersDisliked.findIndex(
            (dislikeUserId) => dislikeUserId === state.likeObject.postUserId
          );
          likeUserExist.usersDisliked.splice(myIndexDislike, 1);
        } else {
          const myIndexLike = likeUserExist.usersLiked.findIndex(
            (likeUserId) => likeUserId === state.likeObject.postUserId
          );
          likeUserExist.usersLiked.splice(myIndexLike, 1);
        }
      }
    },
    dislikeReducer: (state, action) => {
      state.dislikeObject = action.payload;
      const dislikeUserExist = state.posts.find(
        (dislikeUser) => dislikeUser._id === state.dislikeObject.postId
      );
      if (dislikeUserExist) {
        dislikeUserExist.likes = state.dislikeObject.likes;
        dislikeUserExist.dislikes = state.dislikeObject.dislikes;
        dislikeUserExist.dislikeStatus = state.dislikeObject.dislikeStatus;
        dislikeUserExist.likeStatus = state.dislikeObject.likeStatus;
        if (dislikeUserExist.dislikeStatus) {
          dislikeUserExist.usersDisliked.push(state.dislikeObject.postUserId);
          const myIndexLike = dislikeUserExist.usersLiked.findIndex(
            (likeUserId) => likeUserId === state.likeObject.postUserId
          );
          dislikeUserExist.usersLiked.splice(myIndexLike, 1);
        } else {
          const myIndexDislike = dislikeUserExist.usersDisliked.findIndex(
            (dislikeUserId) => dislikeUserId === state.dislikeObject.postUserId
          );
          dislikeUserExist.usersDisliked.splice(myIndexDislike, 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(middlewarePost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    builder.addCase(getPostMiddleware.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(editPostMiddleware.fulfilled, (state, action) => {
      console.log(state.posts);
      state.postEdit.imageUrl = action.payload.imageUrl;
    });

    builder.addCase(deletePostMiddleware.fulfilled, (state, action) => {
      console.log(state.posts);
      state.posts.deletOne = action.payload;
    });
  },
});

export const middlewarePost = createAsyncThunk(
  "type/middlewarePost",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/post/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getPostMiddleware = createAsyncThunk(
  "type/middlewareGetPost",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3300/api/post/",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const editPostMiddleware = createAsyncThunk(
  "type/middlewareEditPost",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3300/api/post/${data.get("postId")}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deletePostMiddleware = createAsyncThunk(
  "type/middlewareDeletePost",
  async (deletePostId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3300/api/post/${deletePostId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const likeDislikePostMiddleware = createAsyncThunk(
  "type/middlewareLikeDislikePost",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3300/api/post/${data.postId}/like`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export default postSlice.reducer;
export const { getPost, postAdded, editMyPost, likeReducer, dislikeReducer } =
  postSlice.actions;
