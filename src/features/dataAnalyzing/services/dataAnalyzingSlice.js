import { createSlice } from "@reduxjs/toolkit";


const dataAnalyzingSlice = createSlice({
    name: 'dataAnalyzing',
    initialState: {
        dataExperiment: []
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

    }
})

export default dataAnalyzingSlice;