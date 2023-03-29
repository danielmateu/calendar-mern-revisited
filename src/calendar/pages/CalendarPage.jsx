import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours} from 'date-fns'
import { Navbar } from '../components/Navbar'

import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesEs } from '../../helpers/getMessages'

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

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log({event, start, end, isSelected});
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
    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
            />
        </>
    )
}

export default CalendarPage