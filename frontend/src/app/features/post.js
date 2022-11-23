import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { posts: [], status: "idle", postEdit: null };

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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(middlewarePost.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(getPostMiddleware.fulfilled, (state, action) => {
      state.posts = action.payload;
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
        `http://localhost:3300/api/post/${data.postId}`,
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
        `http://localhost:3300/api/post/${localStorage.getItem("userId")}/like`,
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
export const { getPost, postAdded, editMyPost } = postSlice.actions;
