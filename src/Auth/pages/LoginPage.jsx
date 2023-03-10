import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './loginPage.css';

const loginForFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerForFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPage = () => {
    // Hook para login 
    const { startLogin, startRegister, errorMessage } = useAuthStore();
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm(loginForFields);
    const { registerName , registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange} = useForm(registerForFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        // console.log({loginEmail , loginPassword});
        startLogin({email: loginEmail, password: loginPassword});
    }
    const registerSubmit = (event) => {
        event.preventDefault();
        if( registerName.length < 5 ){
            Swal.fire('Error en registro', 'El nombre debe sede al menos 5 caracteres' , 'error');
            return; 
        }
        if( registerPassword !== registerPassword2 ){
            Swal.fire('Error en registro', 'Contrasenas no coinciden' , 'error');
            return; 
        }
        
        startRegister({name: registerName, email: registerEmail, password: registerPassword});
    }

    // Manejo de mensajes de error
    useEffect( () => {
        if( errorMessage !== undefined){
            Swal.fire('Error en la autenticacion' , errorMessage, 'error');
        }
    },[errorMessage]);


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contrase??a"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contrase??a"
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contrase??a" 
                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}