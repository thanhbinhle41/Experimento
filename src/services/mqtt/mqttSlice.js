import { createSlice } from "@reduxjs/toolkit";

const mqttSlice = createSlice({
  name: "mqtt",
  initialState: {
    client: null,
    isSubed: false,
    mqttPayload: null,
    connectionStatus: "Connect",
  },
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setIsSubed: (state, action) => {
      state.isSubed = action.payload;
    },
    setMqttPayload: (state, action) => {
      state.mqttPayload = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
  },
});

export default mqttSlice;

export const mqttAction = mqttSlice.actions;

export const clientSelector = (state) => state.mqtt.client;
export const isSubedSelector = (state) => state.mqtt.isSubed;
export const mqttPayloadSelector = (state) => state.mqtt.mqttPayload;
export const connectionStatusSelector = (state) => state.mqtt.connectionStatus;
