import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";


const Register = () => {

    const { registerUser } = useContext(UserContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors}, getValues, setError } = useForm();

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password, data.userName);
            navigate("/");
            window.location.reload()
        } catch (error) {
            switch(error.code){
                case "auth/email-already-in-use" :
                    setError("email", {
                        message: "El correo ya existe"
                    })
                    break;
                    default:
                        setError("email", {
                            message: "Ocurrió un error, intentelo de neuvo"
                        })
            }
        }
    }

  return (
    <> 
    <h1 className="m-5">Crea Tu Cuenta</h1>
    <form onSubmit={handleSubmit(onSubmit)}
    className="m-5"
    >
    <div className="col-sm-3 ">
        <div className="form-group">
            <label  className="form-label mt-2">Nombre de usuario:</label>
                <input type="text" 
                className="form-control"
                placeholder="Nombre de usuario" 
                {...register('userName', {required: 'Campo obligatorio'})}
            />
            {errors.userName && <p style={{color: "red"}}>{errors.userName.message}</p>}
        </div>
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
        <div className="form-group">
        <label  className="form-label mt-2">Repite la Contraseña:</label>
            <input type="password" 
            className="form-control"
            placeholder="Repite la Contraseña" 
            {...register('repassword', {
                                        validate: {
                                            equals: v => v=== getValues('password') || 'Las contraseñas no coinciden',
                                        }})}
        />
        {errors.repassword && <p style={{color: "red"}}>{errors.repassword.message}</p>}
        </div>
        <div className="d-grid gap-2">
            <button type="submit"
            className="btn btn-lg btn-primary mt-5"
            >Registrar</button>
        </div>
        </div>
    </form>
    </>
  )
}

export default Register