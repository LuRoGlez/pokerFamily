import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider'
import { useForm } from 'react-hook-form';

const Login = () => {

    const {loginUser} = useContext(UserContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors}, setError } = useForm();

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            navigate("/");
        } catch (error) {
            switch(error.code){
                case "auth/user-not-found" :
                    setError("password", {
                        message: "El email o la contraseña son incorrectos"
                    })
                    break;
                    default:
                        setError("email", {
                            message: "Ocurrió un error, intentelo de nuevo"
                        })
            }
        }
    }

  return (
      <div className="portada centerFragment">
      
      <form onSubmit={handleSubmit(onSubmit)}  className="createGame">
      <h1 className='my-3'>Inicia Sesión</h1>
       <div>
       <div className="form-group">
        <label  className="form-label mt-2">Email:</label>
            <input type="email" 
            className="form-control"
            placeholder="Email" 
            {...register('email', {required: 'Campo obligatorio'})}
            />
            {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
        </div>
        <div className="form-group">
        <label  className="form-label mt-2">Contraseña:</label>
            <input type="password" 
            className="form-control"
            placeholder="Contraseña" 
            {...register('password', {required: 'Campo obligatorio',
                                      minLength : {
                                            value: 6,
                                            message: 'La contraseña debe tener al menos 6 caracteres'
                                      }})}
        />
        {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
        </div>
        <div className="d-grid gap-2">
        <button type="submit"
        className="btn btn-lg btn-primary mt-5"
        >Iniciar Sesión</button>
        </div>
        </div>
    </form>
    </div>
    
  )
}

export default Login