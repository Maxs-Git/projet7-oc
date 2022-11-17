import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user.js";
import postReducer from "./features/post.js";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});
