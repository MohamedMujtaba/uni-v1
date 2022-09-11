import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isError: false,
};
const user = {
  userName: "admin",
  password: "pet019",
};
const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const { userName, password } = payload;
      if (userName === user.userName && password === user.password) {
        state.isAdmin = true;
        state.isError = false;
      }
      if (userName !== user.userName || password !== user.password) {
        state.isError = true;
      }
    },
    logout: (state) => {
      state.isAdmin = false;
    },
    setError: (state) => {
      state.isError = false;
    },
  },
});
export default adminSlice.reducer;
export const { login, logout, setError } = adminSlice.actions;
