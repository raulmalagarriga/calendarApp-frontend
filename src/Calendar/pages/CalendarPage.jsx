import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { NavBar } from "../components/NavBar";
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { CalendarEventBox } from '../components/CalendarEventBox';
import { useState } from 'react';
import CalendarModal from '../components/CalendarModal';
import { useUIStore } from '../../hooks/useUIStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';


export const CalendarPage = () => {

  // hook para manejar los estados del modal
  const {openDateModal} = useUIStore();
  // hook para manejar los estados de los eventos
  const {events , setActiveEvent , startLoadingEvents} = useCalendarStore();
  
  const {user} = useAuthStore();
  
  const [lastView , setLastView ] = useState(localStorage.getItem('lastView' || 'week'));

  const eventStyleGetter = (event, start , end , isSelected) => {
    // Verificamos los eventos del usuario para asignar estilos 
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    const style = {
      backgroundColor: isMyEvent ? '#347cf7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return { style }
  }

  const onDoubleClick = (event) => {
    // console.log({doubleClick: event});
    openDateModal();
  }
  
  const onSelect = (event) => {
    setActiveEvent( event );
  }
  
  const onViewChange = (event) => {
    localStorage.setItem('lastView' , event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        // defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}        
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete/>
    </>
  )
}
