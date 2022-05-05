import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loginUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("procesando form..." + email + password);
        try {
            await loginUser(email, password);
            navigate("/");
        } catch (error) {
            console.log(error.code);
        }
    };


  return (
      <>
      <h1 className='m-5'>Inicia Sesión</h1>
      <form onSubmit={handleSubmit}
      className="m-5">
       <div className="col-sm-3 ">
        <div className="form-group">
        <label  className="form-label mt-2">Email:</label>
            <input type="email" 
            className="form-control"
            placeholder="Email" 
            value = {email}
            onChange = { e => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group">
        <label  className="form-label mt-2">Contraseña:</label>
        <input type="password" 
        className="form-control"
        placeholder="Contraseña" 
        value = {password}
        onChange = { e => setPassword(e.target.value)}
        />
        </div>
        <div className="d-grid gap-2">
        <button type="submit"
        className="btn btn-lg btn-primary mt-5"
        >Iniciar Sesión</button>
        </div>
        </div>
    </form>
    </>
    
  )
}

export default Login