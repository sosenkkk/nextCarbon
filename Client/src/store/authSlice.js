import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {},
    isAuthenticated:false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action){
            state.isAuthenticated = !state.isAuthenticated
        },
        userInfo(state, action){
            state.user= action.payload
        }
        
    }
});
export const {login, userInfo} = authSlice.actions;

export default authSlice.reducer; 