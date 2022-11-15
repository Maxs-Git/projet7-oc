import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = [
  // {
  //   title: "test",
  //   id: 1,
  //   textContent: "lorem10",
  //   like: 0,
  //   dislike: 1,
  // },
  // {
  //   title: "test22",
  //   id: 2,
  //   textContent: "lorem112",
  //   like: 3,
  //   dislike: 0,
  // },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postComment: (state, action) => {
      state.push(action.payload);
    },
    postAdded: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(middlewarePost.fulfilled, (state, action) => {
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
        data
      );
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export default postSlice.reducer;
export const { postComment, postAdded } = postSlice.actions;
