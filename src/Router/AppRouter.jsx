import { useEffect } from "react";
import { Route, Routes , Navigate } from "react-router-dom"
import { LoginPage } from "../Auth/pages/LoginPage";
import { CalendarPage } from "../Calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks/useAuthStore";


export const AppRouter = () => {
  
    const {checkAuthToken , status} = useAuthStore();
    // const authStatus = 'not-authenticated'; //not-authenticated , checking, authenticated
    useEffect(() => {
      checkAuthToken();
    }, [])
    
    if(status === 'checking'){
        return <h3>Cargando...</h3>
    }

    return (
    <Routes>
        {
            (status === 'not-authenticated')
            ?   (
                    <>
                        <Route path="/auth/*"  element={<LoginPage />}/>
                        <Route path="/*"  element={<Navigate to='/auth/login' />}/>
                    </>
                )
            :   (
                    <>
                        <Route path="/"  element={<CalendarPage />}/> 
                        <Route path="/*"  element={<Navigate to='/' />}/>
                    </>
                )
        }
    </Routes>
  )
}
