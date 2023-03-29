import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import es from 'date-fns/locale/es';
import './CalendarModal.css'
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

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
    const [formSubmited, setFormSubmited] = useState(false)

    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: 'Mateu Pardo',
        start: new Date(),
        end: addHours(new Date(), 2)
    })
    const titleClass = useMemo(() => {
        // console.log('useMemo');
        if (!formSubmited) return '';
        return (formValues.title.length > 2)
            ? ''
            : 'is-invalid'
    }, [formValues.title, formSubmited])


    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onCloseModal = () => {
        // console.log('onCloseModal');
        setIsOpen(false)
    }

    const onDateChange = (e, changing) => {
        // console.log({e, changing});
        setFormValues({
            ...formValues,
            [changing]: e
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmited(true)
        // console.log(formValues);
        // const momentStart = formValues.start.getTime()
        const difference = differenceInSeconds(formValues.end, formValues.start)
        // console.log({ difference });
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha inicio', 'error')
            return
        }

        if (formValues.title.trim().length < 2) {
            Swal.fire('Error', 'El título debe ser mayor a 2 letras', 'error')
            return
        }

        console.log(formValues);

        // TODO:
        // Cerrar modal
        // Remover errores en pantalla
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
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={onSubmit}
            >

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        locale={es}
                        timeCaption='Hora'
                        showTimeSelect
                        selected={formValues.start}
                        className="form-control"
                        onChange={(e) => onDateChange(e, 'start')}
                        dateFormat="Pp"

                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        locale={es}
                        timeCaption='Hora'
                        showTimeSelect
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(e) => onDateChange(e, 'end')}
                        dateFormat="Pp"

                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}

                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button

                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
