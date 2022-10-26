import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/services/authSlice";
import dataAnalyzingSlice from "../features/dataAnalyzing/services/dataAnalyzingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    dataAnalyzing: dataAnalyzingSlice.reducer,
  },
});

export default store;






















