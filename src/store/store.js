import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";


export const store = configureStore({
    reducer: {
        // Add your reducers here
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
})