import { calendarSlice, onSetActiveEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithEventsState, events, initialState } from "../../__fixtures/calendarStates"

describe('Tests sobre calendarSlice', () => {

    test('Debe de regresar el estado inicial', () => {
        const state = calendarSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
    })

    test('onSetActiveEvent de activar el evento', () => {
        // const action = calendarSlice.actions.onSetActiveEvent(events[0]);
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        // console.log(state);
        expect(state.activeEvent).toEqual(events[0]);

    })

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '3',
            title: 'Event 3',
            start: new Date(2019, 0, 1, 10, 0),
            end: new Date(2019, 0, 1, 11, 0),
            title: 'Cumple Nuk',
            notes: 'Alguna nota sobre nukito'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, calendarSlice.actions.onAddNewEvent(newEvent));

        expect(state.events.length).toBe(3);
        expect (state.events).toEqual([...events, newEvent]);
    })

    test('onUpdateEvent debe de actualizar el evento', () => {
        const updatedEvent = {
            id: '1',
            title: 'Event 1',
            start: new Date(2019, 0, 1, 10, 0),
            end: new Date(2019, 0, 1, 11, 0),
            title: 'Cumple Dani actualizado',
            notes: 'Alguna nota sobre Dani actualizado'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, calendarSlice.actions.onUpdateEvent(updatedEvent));
        
        expect(state.events).toContain(updatedEvent);
        
    })

    test('onDeleteEvent debe de borrar el evento', () => {
        // calendarStateWithActiveEvent
        const state = calendarSlice.reducer(calendarWithEventsState, calendarSlice.actions.onDeleteEvent());

        expect(state.events.length).toBe(events.length);
        expect(state.activeEvent).toBeNull();
        

    });

    test('onLoadEvents debe de cargar los eventos', () => {
        // initialState
        const state = calendarSlice.reducer(initialState, calendarSlice.actions.onLoadEvents(events));

        expect(state.events).toEqual(events);
        expect(state.isLoadingEvents).toBe(false);
    });

    test('onLogOutCalendar debe de limpiar el estado', () => {
        // calendarStateWithActiveEvent
        const state = calendarSlice.reducer(calendarWithEventsState, calendarSlice.actions.onLogOutCalendar());

        expect(state).toEqual(initialState);

    });

})