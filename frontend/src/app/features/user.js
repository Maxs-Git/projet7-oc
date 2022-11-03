import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null },
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

export const postData = createAsyncThunk("type/postData", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3300/api/auth/login",
      data
    );
    // If you want to get something back
    const dispatch = useDispatch();
    const userToken = response.data.token;
    dispatch(userToken(response.data.token));
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

// export const fetchLogin = createAsyncThunk(
//   axios({
//     method: "post",
//     url: `${process.env.REACT_APP_API_URL}api/auth/login`,
//     withCredentials: true,
//     data: {
//       email: "",
//       password: "",
//     },
//   })
//     .then((res) => {
//       if (res.data.errors) {
//         console.log("no");
//       } else {
//         console.log("yes");
//         console.log(res.data.token);
//         // window.location = "/post";
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// );

export const { registerUser, logout, loginUser } = userSlice.actions;
export default userSlice.reducer;
