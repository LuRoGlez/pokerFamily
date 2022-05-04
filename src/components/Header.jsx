import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Header = () => ( 
    <main>
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className="container">
            <Link to="#" className='navbar-brand'>
                Poker Family
            </Link>
            <form class="d-flex">
                <input class="form-control me-sm-2" type="text" placeholder="Donde quieres jugar?"/>
                <button class="btn btn-primary my-2 my-sm-0" type="submit">Buscar</button>
            </form>
            <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                    <NavLink
                        to='#'
                        className='nav-link'
                    >Partidas</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink
                        to='#'
                        className='nav-link'
                    >Crear Partida</NavLink>
                </li>
            </ul>
        </div>
    </nav>
    </main>

     );

     export default Header