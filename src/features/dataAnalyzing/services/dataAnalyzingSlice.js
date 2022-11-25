import { createSlice } from "@reduxjs/toolkit";

const dataAnalyzingSlice = createSlice({
  name: "dataAnalyzing",
  initialState: {
    currentDistance: 0,
    dataExperiment: [
      {
        id: "B19DCCN431",
        dataDistance: 30,
        dataFromCOM: [
          { data: { distance: 15, voltage: 20, time: "21-09-2001" } },
          { data: { distance: 10, voltage: 10, time: "20-09-2001" } },
          { data: { distance: 0, voltage: 0, time: "19-09-2001" } },
        ],
        isChosen: false,
        isOnline: false,
      },
      {
        id: "B19DCCN430",
        dataDistance: 30,
        dataFromCOM: [
          { data: { distance: 15, voltage: 20, time: "21-09-2001" } },
          { data: { distance: 10, voltage: 10, time: "20-09-2001" } },
          { data: { distance: 0, voltage: 0, time: "19-09-2001" } },
        ],
        isChosen: false,
        isOnline: false,
      },
    ],
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
      // const { listId, value } = action.payload;
      const listId = action.payload;
      state.dataExperiment.map((item) =>
        listId.includes(item.id)
          ? (item.isChosen = true)
          : (item.isChosen = false)
      );
    },
    addVoltageByID: (state, action) => {
      console.log("addVoltageByID")
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
        console.log("Create new data experiment");
      } else {
        item.dataFromCOM.unshift({ data: data });
        console.log("Add data experiment");
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
      const { id, dataHistory } = action.payload;
      console.log(action.payload);
      const foundData = state.dataExperiment.find((data) => data.id === id);
      if (foundData) {
        foundData.dataFromCOM = dataHistory;
      } else {
        // new client
        const newData = {
          id,
          dataFromCOM: dataHistory,
          isOnline: true,
          isChosen: false,
        };
        state.dataExperiment.push(newData);
      }
    },
    resetDataByID: (state, action) => {
      const {id} = action.payload;
      const foundData = state.dataExperiment.find((data) => data.id === id);
      if (foundData) {
        foundData.dataFromCOM = [];
      }
    },
    deleteSingleDataById: (state, action) => {
      const {id, time} = action.payload;
      const foundData = state.dataExperiment.find((data) => data.id === id);
      if (foundData) {
        const index = foundData.dataFromCOM.findIndex(item => item.time === time);
        if (index !== -1) {
          foundData.dataFromCOM.splice(index, 1);
        }
      }
    }
  },
});

export const dataAnalyzingActions = dataAnalyzingSlice.actions;
export const dataExperimentSelector = (state) =>
  state.dataAnalyzing.dataExperiment;

export default dataAnalyzingSlice;
