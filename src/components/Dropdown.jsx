import  { Dropdown, DropdownItem, DropdownMenu, DropdownToggle}  from 'reactstrap'
import {UserContext} from '../context/UserProvider'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

const Dropd = () => {

    const { user, logOutUser } = useContext(UserContext)

    const [dropdown, setDropdown] = useState(false);

    const openCloseDropdown = () => {
        setDropdown(!dropdown)
    }

    const handleClickLogOut = async() =>{
        try {
            await logOutUser()
        } catch (error) {
            console.log(error.code)
        }
    }

    return(
        <>  
        <Dropdown isOpen={dropdown} toggle={openCloseDropdown} >
            <DropdownToggle caret className='dropdownColor'>
                {user.displayName}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>
                    <Link className="dropdown-item" to="/myGames">Partidas Creadas</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className="dropdown-item" to="/gamesPlayed">Partidas Jugadas</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className="dropdown-item" to= {"/profile/" + user.uid} >Perfil</Link>
                </DropdownItem>
                <DropdownItem>
                <Link
                        to='/login'
                        className='dropdown-item'
                        onClick={handleClickLogOut}
                    >Desconectar</Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
            
        </>
    )
}

export default Dropd