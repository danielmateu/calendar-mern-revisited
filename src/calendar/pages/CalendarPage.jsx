import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours} from 'date-fns'
import { Navbar } from '../components/Navbar'

import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesEs } from '../../helpers/getMessages'
import { CalendarEvent } from '../components/CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'


// const events = [
//     {
//         title: 'Cumpleaños del jefe',
//         notes: 'Comprar el pastel',
//         start: new Date(),
//         end: addHours(new Date(), 2),
//         bgcolor: '#fafafa',
//         user: {
//             _id: '123',
//             name: 'Dani',
//         }
//     },
// ]

const CalendarPage = () => {

    const {openDateModal, closeDateModal} = useUiStore()
    const {events, setActiveEvent} = useCalendarStore()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({event, start, end, isSelected});
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }
        return {
            style,
        }
    }

    const onDoubleClick = (e) => {
        // console.log({onDoubleClick: e});
        openDateModal(e)
    }

    const onSelect = (e) => {
        // console.log({onSelect: e});
        setActiveEvent(e)
    }

    const onViewChanged = (e) => {
        // localStorage.setItem('lastView', e)
        setLastView(e)
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

                <CalendarModal/>
                <FabAddNew/>
                <FabDelete/>
        </>
    )
}

export default CalendarPage