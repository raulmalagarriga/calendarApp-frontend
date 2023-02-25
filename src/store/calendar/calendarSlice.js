import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';
// import { dateFnsLocalizer } from 'react-big-calendar';

// const tempEvents = {
//     id: new Date().getTime(),
//     title: 'Cumple del boss',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours( new Date( ) , 2),
//     bgColor: '#fafafa',
//     user: {
//       id: '123',
//       name: 'Raul'
//     }
//   }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            //tempEvents
        ],  
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state , {payload}) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push( payload );
            state.activeEvent = null; 
        },
        onUpdateEvent: (state , {payload}) => {
            state.events = state.events.map( event => {
                if(event.id === payload.id){
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: (state) => {
            if( state.activeEvent ){
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state , {payload = []}) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            // Se va a verificar si ya se tiene o no los eventos en el store
            payload.forEach( event => {
                const exits = state.events.some(dbEvent => dbEvent.id === event.id); // some: regrese un valor bool
                if( !exits ){
                    state.events.push(event);   
                } 
            }); 
        },
        onCleanCalendar: ( state ) => {
            state.isLoadingEvents = true;
            state.events = []   
            state.activeEvent = null;
        }
    },
    
});
// Action creators are generated for each case reducer function
export const { 
        onSetActiveEvent, 
        onAddNewEvent, 
        onUpdateEvent, 
        onDeleteEvent, 
        onLoadEvents,
        onCleanCalendar
    } = calendarSlice.actions;