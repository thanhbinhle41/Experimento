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
          { data: { distance: 0, voltage: 0, time: "19-09-2001" } },
          { data: { distance: 10, voltage: 10, time: "20-09-2001" } },
          { data: { distance: 15, voltage: 20, time: "21-09-2001" } },
        ],
        isChosen: false,
        isOnline: false,
      },
      {
        id: "B19DCCN430",
        dataDistance: 30,
        dataFromCOM: [
          { data: { distance: 0, voltage: 0, time: "19-09-2001" } },
          { data: { distance: 10, voltage: 10, time: "20-09-2001" } },
          { data: { distance: 15, voltage: 20, time: "21-09-2001" } },
        ],
        isChosen: false,
        isOnline: false,
      },
      {
        id: "B19DCCN067",
        dataDistance: 30,
        dataFromCOM: [
          { distance: 0, voltage: 0, time: "19-09-2001" },
          { distance: 5, voltage: 20, time: "20-09-2001" },
          { distance: 10, voltage: 40, time: "21-09-2001" },
          { distance: 15, voltage: 30, time: "22-09-2001" },
          { distance: 25, voltage: 10, time: "23-09-2001" },
          { distance: 20, voltage: 50, time: "25-09-2001" },
          { distance: 25, voltage: 10, time: "26-09-2001" },
        ],
        isChosen: false,
        isOnline: false,
      },
      {
        id: "TEST-B19DCCNabc",
        dataDistance: 30,
        dataFromCOM: [
          { distance: 0, voltage: 0, time: "19-09-2001" },
          { distance: 5, voltage: 20, time: "20-09-2001" },
          { distance: 10, voltage: 40, time: "21-09-2001" },
          { distance: 18, voltage: 10, time: "24-09-2001" },
          { distance: 20, voltage: 50, time: "25-09-2001" },
          { distance: 25, voltage: 10, time: "26-09-2001" },
        ],
        isChosen: false,
        isOnline: false,
      },
    ],
    /*
            [{ 
                id: "B19DCCN067",
                dataDistance: float,
                dataFromCOM: [{distance, voltage, time}],
                isChosen: boolean,
                isOnline: boolean
            }] 
        */
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
      const { ID, voltage, time } = action.payload;
      const item = state.dataExperiment.find((i) => i.id === ID);
      let newData = {
        distance: state.currentDistance,
        voltage: voltage,
        time: time,
      };
      if (item === undefined) {
        state.dataExperiment.push({
          id: ID,
          distance: state.currentDistance,
          dataFromCOM: [newData],
          isChosen: false,
          isOnline: false,
        });
        console.log("Create new data experiment");
      } else {
        item.dataFromCOM.push(newData);
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
          isOnline: false,
          isChosen: false,
        };
        state.dataExperiment.push(newData);
      }
    },
  },
});

export const dataAnalyzingActions = dataAnalyzingSlice.actions;
export const dataExperimentSelector = (state) =>
  state.dataAnalyzing.dataExperiment;

export default dataAnalyzingSlice;
