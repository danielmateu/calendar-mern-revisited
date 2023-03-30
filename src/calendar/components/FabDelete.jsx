import { addHours } from 'date-fns'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'
// import './FabAddNew.css'
// import '../../styles.css'

export const FabDelete = () => {

    // const { openDateModal } = useUiStore()
    const { deleteEvent } = useCalendarStore()

    const handleClickDeleteEvent = () => {
        deleteEvent()
    }

    return (
        <button className='btn btn-danger fab-danger d-flex gap-2 align-items-center'
            onClick={handleClickDeleteEvent}
        >
            <i className='fas fa-trash-alt'></i>
            <span>Elimina</span>
        </button>
    )
}
