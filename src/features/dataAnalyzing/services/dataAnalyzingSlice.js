import { createSlice } from "@reduxjs/toolkit";
import { dataTypeConst } from "../utils/constants";

const dataAnalyzingSlice = createSlice({
  name: "dataAnalyzing",
  initialState: {
    currentDistance: 0,
    dataExperiment: [],
  },
  reducers: {
    toggleChosenSatusById: (state, action) => {
      const foundData = state.dataExperiment.find(
        (data) => data.id === action.payload
      );
      foundData.isChosen = !foundData.isChosen;
    },
    setChosenFalseById: (state, action) => {
      const foundData = state.dataExperiment.find(
        (data) => data.id === action.payload
      );
      foundData.isChosen = false;
    },
    setChosenByListid: (state, action) => {
      const listId = action.payload;
      state.dataExperiment.map((item) =>
        listId.includes(item.id)
          ? (item.isChosen = true)
          : (item.isChosen = false)
      );
    },
    addVoltageByID: (state, action) => {
      const { ID, data } = action.payload;
      const item = state.dataExperiment.find((i) => i.id === ID);
      if (item === undefined) {
        state.dataExperiment.push({
          id: ID,
          distance: state.currentDistance,
          dataFromCOM: [{ data: data }],
          isChosen: false,
          isOnline: false,
        });
      } else {
        item.dataFromCOM.unshift({ data: data });
      }
    },
    setCurrentDistance: (state, action) => {
      state.currentDistance = action.payload;
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload;
    },
    setOnlineById: (state, action) => {
      const foundData = state.dataExperiment.find(
        (data) => data.id === action.payload
      );
      if (foundData) {
        foundData.isOnline = true;
      }
    },
    setOfflineById: (state, action) => {
      const foundData = state.dataExperiment.find(
        (data) => data.id === action.payload
      );
      if (foundData) {
        foundData.isOnline = false;
      }
    },
    addData: (state, action) => {
      const { id, dataHistory, dataType } = action.payload;
      const foundData = state.dataExperiment.find((data) => data.id === id);
      if (foundData) {
        foundData.dataFromCOM[dataType] = dataHistory;
      } else {
        // new client
        const dataFromCOM = {};
        dataFromCOM[dataType] = dataHistory;
        if (dataType !== dataTypeConst.AV) {
          dataFromCOM[dataTypeConst.AV] = [];
        }
        if (dataType !== dataTypeConst.CV) {
          dataFromCOM[dataTypeConst.CV] = [];
        }
        if (dataType !== dataTypeConst.TV) {
          dataFromCOM[dataTypeConst.TV] = [];
        }
        const newData = {
          id,
          dataFromCOM: dataFromCOM,
          isOnline: true,
          isChosen: false,
        };
        state.dataExperiment.push(newData);
      }
    },
    resetDataByID: (state, action) => {
      const { id } = action.payload;
      const foundData = state.dataExperiment.find((data) => data.id === id);
      if (foundData) {
        foundData.dataFromCOM = [];
      }
    },
    deleteSingleDataById: (state, action) => {
      const { id, time } = action.payload;
      const foundData = state.dataExperiment.find((data) => data.id === id);
      if (foundData) {
        const index = foundData.dataFromCOM.findIndex(
          (item) => item.time === time
        );
        if (index !== -1) {
          foundData.dataFromCOM.splice(index, 1);
        }
      }
    },
  },
});

export const dataAnalyzingActions = dataAnalyzingSlice.actions;
export const dataExperimentSelector = (state) =>
  state.dataAnalyzing.dataExperiment;

export default dataAnalyzingSlice;
