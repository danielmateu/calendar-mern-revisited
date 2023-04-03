import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents"
import Swal from "sweetalert2"

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
        try {

            if (calendarEvent.id) {
                // Actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                // updateEvent(calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return
            }

            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.response.data.msg, 'error')
        }
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        } catch (error) {
            console.log(error);
            // Swal.fire('Error', error.response.data.msg, 'error')
            Swal.fire('Error', 'No se pudo eliminar el evento', 'error')
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            // console.log(data);
            const events = convertEventsToDateEvents(data.eventos)
            // console.log(events);
            dispatch(onLoadEvents(events))
        } catch (error) {
            console.log(error);
            console.log('Cargando eventos');
        }
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent?.id,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
