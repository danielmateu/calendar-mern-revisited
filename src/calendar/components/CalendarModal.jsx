import { useState } from 'react';
import Modal from 'react-modal';
import './CalendarModal.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true)

    const onCloseModal = () => {
        // console.log('onCloseModal');
        setIsOpen(false)
    }

    return (
        <Modal
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onCloseModal}
            style={customStyles}
            // contentLabel="Example Modal"
        >
            <h2>Hola mundo</h2>
            <div>I am a modal, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, corporis?</div>
            {/* <button className='btn btn-danger' onClick={onCloseModal}>close</button> */}

        </Modal>
    )
}
