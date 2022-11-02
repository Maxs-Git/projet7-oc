import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
    },

    loginUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});



export const fetchLogin = createAsyncThunk(
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}api/auth/login`,
    withCredentials: true,
    data: {
      email: "",
      password: "",
    },
  })
    .then((res) => {
      if (res.data.errors) {
        console.log("no");
      } else {
        console.log("yes");
        console.log(res.data.token);
        // window.location = "/post";
      }
    })
    .catch((err) => {
      console.log(err);
    })
);

export const { registerUser, logout, loginUser } = userSlice.actions;
export default userSlice.reducer;
