import { useSelector , useDispatch } from "react-redux"
import Swal from "sweetalert2";
import calendarAPI from "../api/calendarAPI";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";




export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events , activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = ( calendarEvent) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        
        try {
            // Esta condicion es para hacer el update de un evento
            if( calendarEvent.id ){
                await calendarAPI.put(`/events/${calendarEvent.id}` , calendarEvent);
                dispatch( onUpdateEvent( {...calendarEvent , user}) );
                return;
            }
            // Para crear un nuevo evento
            const {data} = await calendarAPI.post('/events' , calendarEvent);
            console.log(data)
            dispatch( onAddNewEvent( {...calendarEvent , id: data.evento.id , user }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar' , error.response.data.msg , 'error');
        }

        
    }
    
    const startDeleteEvent = async() => {
        
        try {
            await calendarAPI.delete(`/events/${activeEvent.id}`);    
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar' , error.response.data.msg , 'error');
        }
    }
    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarAPI.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents(events));
            console.log(events)
        } catch (error) {
            console.log('error cargando eventos');
            console.log(error);
        }
    }
  
    return {
        // propiedades
        events,
        activeEvent,
        /* Lo usaremos para determinar si tenemos seleccionado algo, si es null = falso, si tenemos
        algo = true */
        hasEventSelected: !!activeEvent, /*Doble negacion, convierte la variable en un booleano*/
        // metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents,
    }
    
}
