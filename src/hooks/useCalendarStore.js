import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    // console.log(events);
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    // const addNewEvent = (event) => {
    //     dispatch(onAddNewEvent(event))
    // }

    const startSavingEvent = async (calendarEvent) => {
        // Todo: Llegar al backend
        // Todo bien
        if (calendarEvent._id) {
            // updateEvent(calendarEvent)
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }

    }

    const deleteEvent = (event) => {
        dispatch(onDeleteEvent(event))
    }


    // const clearActiveEvent = () => {
    //     // dispatch(onClearActiveEvent())
    // }

    // const updateEvent = (event) => {
    //     // dispatch(onUpdateEvent(event))
    // }



    return {
        // Propiedades
        events,
        activeEvent,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        deleteEvent
    }
}
