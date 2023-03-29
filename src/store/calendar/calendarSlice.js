import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = [{
    title: 'Cumpleaños del jefe',
    notes: 'Comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Dani',
    }
}]

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        // counter: 10
        events: tempEvent,
        activeEvent: null
    },
    reducers: {
        // increment: (state, /* action */) => {
        //     state.counter += 1;
        // },
    }
});


// Action creators are generated for each case reducer function
export const {

} = calendarSlice.actions;