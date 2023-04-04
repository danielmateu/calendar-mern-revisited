
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'

export const FabDelete = () => {

    const { openDateModal } = useUiStore()
    const { startDeletingEvent, hasEventSelected } = useCalendarStore()

    const handleClickDeleteEvent = () => {
        startDeletingEvent()
    }

    return (
        //if hasEventSelected is true, then display the button, else, don't display it
        <button className='btn btn-danger fab-danger'
            onClick={handleClickDeleteEvent}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <div className='btn-style'>
                <i className='fas fa-trash-alt'></i>
                <span className='btn-desc'>Delete event</span>
            </div>
        </button>


    )
}
