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
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const postLogin = createAsyncThunk("type/postLogin", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3300/api/auth/login",
      data
    );
    // const userToken = response.data.token;
    return response.data.token;
  } catch (err) {
    console.error(err);
  }
});

export const { registerUser, logout, loginUser } = userSlice.actions;
export default userSlice.reducer;
