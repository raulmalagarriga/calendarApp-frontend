import { addHours, differenceInSeconds } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react'
import DatePicker , {registerLocale} from "react-datepicker";
import 'sweetalert2/dist/sweetalert2.min.css'
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2';
import { useUIStore } from '../../hooks/useUIStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

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
  
const CalendarModal = () => {

    const { activeEvent , startSavingEvent} = useCalendarStore();
    // Hook para manejar los estados del modal
    const { isDateModalOpen , closeDateModal} = useUIStore();
    // estados del formulario
    const [formValues, setFormValues] = useState({ 
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date() , 2) //add two hours on new Date()
    })
    // estado del envio del formulario
    const [formSubmitted, setFormSubmitted] = useState(false);
    // Memorizando las clases de estilos del input
    const titleClass = useMemo(() => {
      if( !formSubmitted ) return '';
      return( formValues.title.length > 0 )
            ? 'is-valid'
            :'is-invalid';
    } , [formValues.title, formSubmitted])
    // Actualizar el evento seleccionado
    useEffect(() => {
      if( activeEvent !== null ){
        setFormValues({...activeEvent});
      }
    
    }, [activeEvent])
    

    const onCloseModal = () => {
        closeDateModal();
    }
    // Input manage
    const onInputChange = ({target}) => {
      setFormValues({
        ...formValues, 
        [target.name] : target.value
      })
    }
    // Update date
    const onDateChange = (event , changing) => {
      setFormValues({
        ...formValues, 
        [changing] : event
      })
    }

    // Post form
    const onSubmit = async(e) => {
      e.preventDefault();
      setFormSubmitted(true);
      const difference = differenceInSeconds(formValues.end , formValues.start);
      // Validaciones de formulario
      if( isNaN( difference ) || difference <= 0 ){
        Swal.fire('Fechas incorrectas' , 'Revisar las fechas ingresadas', 'error')
        return;
      }
      // Validaciones de formulario
      if( formValues.title.length <= 0) return;
      // Guardamos datos del evento
      await startSavingEvent( formValues );
      // Cerramos modal
      closeDateModal();
      // limpiamos estado del formulario enviado
      setFormSubmitted( false );
    }

    return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker 
                  selected={formValues.start}
                  onChange={(event) => onDateChange( event , 'start')}
                  className='form-control'
                  dateFormat='Pp' //Hours
                  showTimeSelect
                  locale='es'
                  timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker 
                  minDate={formValues.start}
                  selected={formValues.end}
                  onChange={(event) => onDateChange( event , 'end')}
                  className='form-control'
                  dateFormat='Pp' //Hours
                  showTimeSelect
                  locale='es'
                  timeCaption='Hora'
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${ titleClass }`}
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
export default CalendarModal;