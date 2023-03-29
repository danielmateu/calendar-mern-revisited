import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import enUS from 'date-fns/locale/en-US'

import { Navbar } from '../components/Navbar'
import { addHours, parse, startOfWeek, getDay, format } from 'date-fns'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const events = [
    {
        title: 'Cumpleaños del jefe',
        notes: 'Comprar el pastel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgcolor: '#fafafa',
        user: {
            _id: '123',
            name: 'Dani',
        }
    },
]

const CalendarPage = () => {
    return (
        <>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
            />
        </>
    )
}

export default CalendarPage