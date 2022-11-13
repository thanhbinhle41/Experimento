import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import authSlice from "../features/auth/services/authSlice";
import dataAnalyzingSlice from "../features/dataAnalyzing/services/dataAnalyzingSlice";
import mqttSlice from "../services/mqtt/mqttSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const reducers = combineReducers({
  auth: authSlice.reducer,
  dataAnalyzing: dataAnalyzingSlice.reducer,
  mqtt: mqttSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dataAnalyzing"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: persistedReducer,
});

const persistor = persistStore(store, {}, () => {});

export default store;
export { persistor };
