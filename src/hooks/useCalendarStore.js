import { useDispatch, useSelector } from "react-redux"


export const useCalendarStore = () => {

    const {events, activeEvent} = useSelector(state => state.calendar)
    // console.log(events);
    const dispatch = useDispatch()

    const addNewEvent = (event) => {
        // dispatch(onAddNewEvent(event))
    }

    const setActiveEvent = (event) => {
        // dispatch(onSetActiveEvent(event))
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
        
    }
}
