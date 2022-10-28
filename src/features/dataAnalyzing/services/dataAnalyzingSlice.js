import { createSlice } from "@reduxjs/toolkit";

const dataAnalyzingSlice = createSlice({
  name: "dataAnalyzing",
  initialState: {
    dataExperiment: [
      {
        id: "B19DCCN067",
        dataDistance: 30,
        dataFromCOM: [{ distance: 5, voltage: 30, time: "19-09-2001" }],
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
  },
});

export const dataAnalyzingActions = dataAnalyzingSlice.actions;
export const dataExperimentSelector = (state) =>
  state.dataAnalyzing.dataExperiment;

export default dataAnalyzingSlice;
