import { useDispatch, useSelector } from "react-redux"
import calendarAPI from "../api/calendarAPI";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onCleanCalendar } from "../store/calendar/calendarSlice";


/* En lugar de usar thunks, usaremos hooks para el manejo de las peticiones asincronas */
export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status , errorMessage, user } = useSelector(state => state.auth);

    const startLogin = async({email , password}) => {
        dispatch( onChecking() ); // Colocamos la app en estado de carga
        console.log({email , password});
        // Accedemos al backend
        try {
            // Indicamos la ruta, e indicamos el body a enviar al backend
            const {data} = await calendarAPI.post('/auth' , { email , password });
            localStorage.setItem('token' , data.token);
            localStorage.setItem('token-init-date' , new Date().getTime());
            dispatch( onLogin({ name: data.name , uid: data.uid}));
        } catch (error) {
            console.log(error);
            dispatch( onLogout( 'Credenciales incorrectas' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage());
            }, 10);
        }
    }
    const startRegister = async({name , email, password}) => {
        dispatch( onChecking() ); // Colocamos la app en estado de carga
        console.log({name ,email , password});
        // Accedemos al backend
        try {
            const {data} = await calendarAPI.post('/auth/new' , {name, email, password});
            localStorage.setItem('token' , data.token);
            localStorage.setItem('token-init-date' , new Date().getTime());
            dispatch( onLogin({name: data.name , uid: data.uid}));
        } catch ({response}) {
            console.log({response});
            dispatch( onLogout( response.data.msg ));
            setTimeout(() => {
                dispatch( clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return dispatch( onLogout() );
        }
        try {
            const {data} = await calendarAPI.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date' , new Date().getTime());
            dispatch( onLogin({name: data.name , uid: data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }
    const startLogout = () => {
        localStorage.clear();
        dispatch( onCleanCalendar() );
        dispatch( onLogout() );
    }


    return {
        // Propiedades
        status,
        errorMessage,
        user,

        // Metodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout
    }
}