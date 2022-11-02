import { createSlice } from "@reduxjs/toolkit";

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
    postComment: (state, action) => {
      state.value = action.payload;
    },

    like: (state) => {
      state.value += 1;
    },
    dislike: (state) => {
      state.value += 1;
    },
  },
});

export default postSlice.reducer;
export const { postComment, like, dislike } = postSlice.actions;
