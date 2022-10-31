import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/services/authSlice";
import dataAnalyzingSlice from "../features/dataAnalyzing/services/dataAnalyzingSlice";
import mqttSlice from "../services/mqtt/mqttSlice";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    auth: authSlice.reducer,
    dataAnalyzing: dataAnalyzingSlice.reducer,
    mqtt: mqttSlice.reducer,
  },
});

export default store;






















