import { addHours } from 'date-fns'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'
// import './FabAddNew.css'

export const FabAddNew = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const handleClickNewEvent = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '456',
                name: 'Silvia'
            }
        })
        openDateModal()
    }

    return (
        <button className='btn btn-primary fab'
            onClick={handleClickNewEvent}
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}
