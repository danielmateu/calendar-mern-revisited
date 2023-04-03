import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = [
    {
        _id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        notes: 'Comprar el pastel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgcolor: '#fafafa',
        user: {
            _id: '123',
            name: 'Dani',
        }
    }
]

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {

        events: tempEvent,
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(
                e => (e._id === payload._id) ? payload : e
            )
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(
                    e => (e._id !== state.activeEvent._id)
                );
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload }) => {
            state.events = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents
} = calendarSlice.actions;