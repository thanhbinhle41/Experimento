import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usernameAdmin: "admin",
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
    setUsernameAdmin: (state, action) => {
      state.usernameAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.usernameAdmin = "admin";
      state.isAdmin = false;
    });
  },
});

export default authSlice;

export const authSliceActions = authSlice.actions;

export const usernameAdminSelector = (state) => state.auth.usernameAdmin;
export const isAdminSelector = (state) => state.auth.isAdmin;
export const currentIDSelector = (state) => state.auth.currentID;
