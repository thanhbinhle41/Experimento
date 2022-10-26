import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        usernameAdmin: "Le Xuan Minh",
        passwordAdmin: "123456790",
        studentID: [],  // {}

    },
    reducers: {

    }
})

export default authSlice;