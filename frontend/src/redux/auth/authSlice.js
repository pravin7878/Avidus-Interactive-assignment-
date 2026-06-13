import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },

        loginSuccess: (state, action) => {
            state.isLoading = false;

            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );

            localStorage.setItem(
                "token",
                action.payload.token
            );
        },

        loginFailure: (state) => {
            state.isLoading = false;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;