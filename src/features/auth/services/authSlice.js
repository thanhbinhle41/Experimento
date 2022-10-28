import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usernameAdmin: "admin",
    passwordAdmin: "123456",
    isAdmin: false,
    studentID: [], // {}
  },
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
      console.log(action.payload);
    },
  },
});

export default authSlice;

export const authSliceActions = authSlice.actions;

export const usernameAdminSelector = (state) => state.auth.usernameAdmin;
export const passwordAdminSelector = (state) => state.auth.passwordAdmin;
export const isAdminSelector = (state) => state.auth.isAdmin;
