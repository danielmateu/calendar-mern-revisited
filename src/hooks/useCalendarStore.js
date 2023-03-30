import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    // console.log(events);
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

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

    const startDeletingEvent = (event) => {
        // Todo: Llegar al backend
        dispatch(onDeleteEvent(event))
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent?._id,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}
