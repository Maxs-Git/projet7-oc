import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = [
  {
    title: "test",
    id: 1,
    textContent: "lorem10",
    like: 0,
    dislike: 1,
  },
  {
    title: "test22",
    id: 2,
    textContent: "lorem112",
    like: 3,
    dislike: 0,
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.push(action.payload);
    },
    postAdded: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(middlewarePost.fulfilled, (state, action) => {
      // state = action.payload;
    });
    builder.addCase(getPostMiddleware.fulfilled, (state, action) => {
      state = action.payload;
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
      console.log(response);
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

export default postSlice.reducer;
export const { getPost, postAdded } = postSlice.actions;
