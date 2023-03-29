import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const {events, activeEvent} = useSelector(state => state.calendar)
    // console.log(events);
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const addNewEvent = (event) => {
        // dispatch(onAddNewEvent(event))
    }


    const clearActiveEvent = () => {
        // dispatch(onClearActiveEvent())
    }

    const updateEvent = (event) => {
        // dispatch(onUpdateEvent(event))
    }



    return {
        // Propiedades
        events,
        activeEvent,

        // Metodos
        setActiveEvent,
    }
}
