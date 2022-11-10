import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./features/user.js";
import postData from "./features/user.js";
import postReducer from "./features/post.js";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  // middleware: [
  //   ...getDefaultMiddleware(),
  //   postData],
});
