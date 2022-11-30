import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loggedIn: false },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },

    thisUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      
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
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const postRegister = createAsyncThunk(
  "type/postSignup",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/auth/signup",
        data
      );
      // const userToken = response.data.token;
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getUser = createAsyncThunk("type/getUser", async () => {
  try {
    const response = await axios.get(
      `http://localhost:3300/api/auth/${localStorage.getItem("userId")}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const userToken = (state) => state.user.token;

export const { registerUser, logout, loginUser } = userSlice.actions;
export default userSlice.reducer;
