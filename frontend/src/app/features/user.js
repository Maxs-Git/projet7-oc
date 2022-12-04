import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loggedIn: false, userLoad: "idle" },
  reducers: {
    loginUser: (state, action) => {
      state.loggedIn = true;
      localStorage.setItem("token", state.user.token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state, action) => {
      state.userLoad = "pending";
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userLoad = "succeeded";
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
