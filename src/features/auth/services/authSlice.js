import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usernameAdmin: "admin",
    passwordAdmin: "123456",
    isAdmin: true,
    studentID: [], // [{}]
    currentID: null,
  },
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setCurrentUserID: (state, action) => {
      state.currentID = action.payload;
    },
  },
});

export default authSlice;

export const authSliceActions = authSlice.actions;

export const usernameAdminSelector = (state) => state.auth.usernameAdmin;
export const passwordAdminSelector = (state) => state.auth.passwordAdmin;
export const isAdminSelector = (state) => state.auth.isAdmin;
export const currentIDSelector = (state) => state.auth.currentID;
