import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // checking, authenticated, not-authenticated
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, action) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        onError: (state, action) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = action.payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    onChecking,
    onLogin,
    onLogout,
    onError,
    clearErrorMessage,
} = authSlice.actions;