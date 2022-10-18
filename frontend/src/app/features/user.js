import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: { name: "maxens", email: "max@gmail.com" } },
  reducers: {
    registerUser: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { registerUser } = userSlice.actions;
export default userSlice.reducer;
