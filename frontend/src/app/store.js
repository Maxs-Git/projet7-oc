import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.js";
export default configureStore({
  reducer: {
    user: userReducer,
  },
});
