import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)
    // console.log(events);

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
            // addNewEvent(calendarEvent)
            const { data } = await calendarApi.post('/events', calendarEvent)
            // console.log(data);

            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
        }

    }

    const startDeletingEvent = (event) => {
        // Todo: Llegar al backend
        dispatch(onDeleteEvent(event))
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            // console.log(data);
            dispatch(onLoadEvents(data.events))
        } catch (error) {
            console.log(error);
            console.log('Cargando eventos');
        }
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent?._id,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
