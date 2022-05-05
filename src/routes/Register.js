import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const { registerUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password, userName);
            navigate("/");
            window.location.reload()
        } catch (error) {
            console.log(error.code);
        }
    };

  return (
    <> 
    <h1 className="m-5">Crea Tu Cuenta</h1>
    <form onSubmit={handleSubmit}
    className="m-5"
    >
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
        <div className="form-group">
        <label  className="form-label mt-2">Nombre de usuario:</label>
        <input type="text" 
        className="form-control"
        placeholder="Nombre de usuario" 
        value = {userName}
        onChange = { e => setUserName(e.target.value)}
        />
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