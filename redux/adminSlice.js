import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  role: "",
  dep: "",
  year: "",
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const { username, role, dep, year } = payload;
      state.username = username;
      state.role = role;
      state.dep = dep;
      state.year = year;
    },
    logout: (state) => {
      state.username = "";
      state.role = "";
      state.dep = "";
      state.year = "";
    },
    setLoading: (state, { payload }) => {
      const { isLoading } = payload;
      state.loading = isLoading;
    },
    setError: (state, { payload }) => {
      const { err } = payload;
      state.error = err;
    },
  },
});
export default adminSlice.reducer;
export const { login, logout, setError, setLoading } = adminSlice.actions;
