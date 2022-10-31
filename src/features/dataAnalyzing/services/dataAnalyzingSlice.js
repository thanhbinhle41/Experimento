import { createSlice } from "@reduxjs/toolkit";
import { getDateTime } from "../../../utils/utils";

const dataAnalyzingSlice = createSlice({
  name: "dataAnalyzing",
  initialState: {
    currentDistance: 0,
    dataExperiment: [
      {
        id: "B19DCCN431",
        dataDistance: 30,
        dataFromCOM: [
          { distance: 0, voltage: 0, time: "19-09-2001" },
          { distance: 5, voltage: 20, time: "19-09-2001" },
          { distance: 10, voltage: 40, time: "19-09-2001" },
          { distance: 15, voltage: 30, time: "19-09-2001" },
          { distance: 25, voltage: 10, time: "19-09-2001" },
          { distance: 18, voltage: 10, time: "19-09-2001" },
          { distance: 20, voltage: 50, time: "19-09-2001" },
          { distance: 25, voltage: 10, time: "19-09-2001" },
        ],
        isChosen: false,
        isOnline: false,
      },
      {
        id: "ALO123_B19DCCN067",
        dataDistance: 30,
        dataFromCOM: [
          { distance: 0, voltage: 0, time: "19-09-2001" },
          { distance: 5, voltage: 30, time: "19-09-2001" },
          { distance: 10, voltage: 20, time: "19-09-2001" },
          { distance: 15, voltage: 40, time: "19-09-2001" },
          { distance: 18, voltage: 40, time: "19-09-2001" },
          { distance: 20, voltage: 60, time: "19-09-2001" },
          { distance: 25, voltage: 10, time: "19-09-2001" }
        ],
        isChosen: false,
        isOnline: false,
      },
      {
        id: "B19DCCNabc",
        dataDistance: 30,
        dataFromCOM: [
          { distance: 0, voltage: 0, time: "19-09-2001" },
          { distance: 5, voltage: 30, time: "19-09-2001" },
          { distance: 10, voltage: 20, time: "19-09-2001" },
          { distance: 15, voltage: 40, time: "19-09-2001" },
          { distance: 18, voltage: 40, time: "19-09-2001" },
          { distance: 20, voltage: 60, time: "19-09-2001" },
          { distance: 25, voltage: 10, time: "19-09-2001" },
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
    addVoltageByID: (state, action) => {
      const {ID, voltage} = action.payload;
      const item = state.dataExperiment.find(i => i.id === ID);
      item.dataFromCOM.push({
        distance: state.currentDistance, voltage: voltage, time: "2h19" 
      })
    },
    setCurrentDistance: (state, action) => {
      state.currentDistance = action.payload;
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload;
    },
  },
});

export const dataAnalyzingActions = dataAnalyzingSlice.actions;
export const dataExperimentSelector = (state) =>
  state.dataAnalyzing.dataExperiment;

export default dataAnalyzingSlice;
