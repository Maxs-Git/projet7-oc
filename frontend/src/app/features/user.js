import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loggedIn: false, userLoad: "idle" },
  reducers: {
    loginUser: (state, action) => {},
    loadToken: (state, action) => {
      const myToken = localStorage.getItem("token");
      if (myToken) {
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      window.location.assign("http://localhost:3000/Login");
    });
    builder.addCase(postLogin.pending, (state, action) => {
      state.userLoad = "pending";
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userLoad = "succeeded";
      state.loggedIn = true;
      localStorage.setItem("token", action.payload.token);
      window.location.assign("http://localhost:3000/post");
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      window.alert("Mot de passe ou email invalide");
    });

    builder.addCase(postRegister.rejected, (state, action) => {
      window.alert("Mot de passe ou email invalide");
    });
  },
});

// mot de passe trop court ou email deja utilisé

export const postLogin = createAsyncThunk(
  "type/postLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/auth/login",
        data
      );
      // const userToken = response.data.token;
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

export const postRegister = createAsyncThunk(
  "type/postSignup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/auth/signup",
        data
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "type/getUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3300/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const userToken = (state) => state.user.token;

export const { registerUser, logout, loginUser, loadToken } = userSlice.actions;
export default userSlice.reducer;
