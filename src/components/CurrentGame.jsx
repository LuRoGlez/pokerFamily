import { useContext } from "react"
import { Link } from "react-router-dom"
import { FirestoreContext } from "../context/UseFirestore"
import { auth } from "../firebase/firebaseConfig"
import emailjs from "@emailjs/browser"
import Swal from "sweetalert2"

const CurrentGame = ({current, playersGame, getDetailGame, toDate, toTime, playedByAuth}) => {

    const {addPlayGame, deletePlayGame} =  useContext(FirestoreContext)

    if(!current){
        return null
    }


    const sendEmail = (data) => {
        emailjs.send('service_tooaolo', 'template_hunhf49', data, 'Q2S2tHcqfGEqMnk-1').then((result) =>{
            }, (error) => {
                Swal.fire(
                    error.txt,
                    '',
                    'error'
                  )
            })
        }
        
    

    const addPlayerGame = async(game) =>{
        try {
            await addPlayGame(game.id)
            await getDetailGame(game.id)
            Swal.fire(
                game.name,
                'Te has registrado en la partida!',
                'success'
              )
            const data = {email : auth.currentUser.email, name : auth.currentUser.displayName, address : game.address, nameGame : game.name}
            sendEmail(data)
        } catch (error) {
            Swal.fire(
                error.txt,
                '',
                'error'
              )
        }
    }

    const cancelRegister = async (game) => {
        await deletePlayGame(playedByAuth[0].id)
        Swal.fire(
            'Registro cancelado',
            '',
            'warning'
          )
    }
    

    const formatNumber = number => {
       return new Intl.NumberFormat('es-ES').format(parseInt(number))
    }

    const numRegistered = id => {
        const f = playersGame.filter(game => (game.gameId === id))
        return f.length
    }

    return ( 
        <>
        <h2 className="my-3">Detalles</h2>
        <div className="registerDetail">
        <div className="separador">
        <div className="containerDetalles">
            <h4>{current[0].name}</h4>
            <ul>
            <li><span>Fecha: </span>{toDate(current[0].start.seconds)}</li>
            <li><span>Hora: </span>{toTime(current[0].start.seconds)} h</li>
            <li><span>Ciudad: </span>{current[0].city}</li>
            <li><span>Buy In: </span>{current[0].buyin} €</li>
            <li><span>Stack Inicial: </span>{formatNumber(current[0].stackInicial)}</li>
            <li><span>Niveles: </span>{current[0].levels} minutos</li>
            <li><span>Nº de jugadores: </span>{numRegistered(current[0].id)}/{current[0].maxPlayers}</li>
            <li><span>Tamaño de mesa: </span>{current[0].playersXtable} jugadores</li>
            {current[0].lateRegister ?
            
                <li><span>Niveles de Tardío: </span>{current[0].lateLevels}</li> :
                <li><span>Sin Registro Tardío</span></li>
            
            }
            {current[0].addon && 
            <>
                <li><span>Precio Addon: </span>{current[0].addonPrice} €</li>
                <li><span>Puntos Addon: </span>{formatNumber(current[0].addonChips)}</li>
                <li><span>Nivel Addon: </span>{current[0].addonLevel}</li>
            </>
            }
            </ul>
        </div>
        <div className="jugadores">
            <table className="playersGame">
                <thead>
                    <tr>
                        <th className="playersTableTitle">Jugadores</th>
                    </tr>
                </thead>            
                {
                    playersGame.map(player => (
                        current[0].id === player.gameId &&
                        <tbody className="jugador"
                        key = {player.id}
                        >
                        <tr>
                        <td><Link to = {"/profile/" + player.uid} style={{ color: 'inherit', textDecoration: 'inherit'}}> {player.displayName}</Link></td>
                        </tr>
                    </tbody>))
                }
            </table>
        </div>
        </div>
        
        <div className="botonRegister">
      {
          playersGame.find(player => player.uid === auth.currentUser.uid) ? <button 
          className="btn btn-primary"
          onClick={() => cancelRegister(current[0].id)}
          >Cancelar Registro</button> 
          :  numRegistered(current[0].id) >= current[0].maxPlayers ? 
          <button 
          className="btn btn-info"
          >¡No quedan plazas!
          </button> 
          :
          <button 
          className="btn btn-primary"
          onClick={() => addPlayerGame(current[0])}
          >Registrar</button>
      }
       </div>     
        </div>
        </>
     );
}
 
export default CurrentGame;