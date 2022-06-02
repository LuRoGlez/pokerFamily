import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserProvider';
import { useForm } from "react-hook-form";
import Dropd from './Dropdown';
import logo from '../resources/pokerFamilylogo.PNG'
import { SearchContext } from '../context/SearchProvider'

const Header = () => {
    const { user } = useContext(UserContext)
    const {searchCity} = useContext(SearchContext)

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data.city)
        searchCity(data.city)
    }

    return (
    <main>
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className="container">
            <Link to="/" className='navbar-brand'>
                <img src={logo} alt="logo" width={200} />
            </Link>
            { user ? <>
            <form className="d-flex"
            onSubmit={handleSubmit(onSubmit)}
            >
                <input className="form-control me-sm-2" 
                type="text" 
                placeholder="Donde quieres jugar?"
                {...register('city')}
                />
                <button className="btn btn-primary my-2 my-sm-0" type="submit">Buscar</button>
            </form>
            <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                    <NavLink
                        to='/'
                        className='nav-link'
                    >Partidas</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink
                        to='/createGame'
                        className='nav-link'
                    >Crear Partida</NavLink>
                </li>
                <Dropd />
            </ul></> : 
             <ul className='navbar-nav mr-auto'>
             <li className='nav-item'>
                 <NavLink
                     to='/login'
                     className='nav-link'
                 >Login</NavLink>
             </li>
             <li className='nav-item'>
                 <NavLink
                     to='/register'
                     className='nav-link'
                 >Registrarse</NavLink>
             </li>
             </ul>} 
        </div>
    </nav>
    </main>

     );
    }

     export default Header