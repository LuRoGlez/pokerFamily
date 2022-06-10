import { useContext } from "react"
import { Link } from "react-router-dom"
import { FirestoreContext } from "../context/UseFirestore"
import { auth } from "../firebase/firebaseConfig"
import emailjs from "@emailjs/browser"

const CurrentGame = ({current, playersGame, getDetailGame, toDate, toTime, playedByAuth}) => {

    const {addPlayGame, deletePlayGame} =  useContext(FirestoreContext)

    if(!current){
        return null
    }


    const sendEmail = (data) => {
        emailjs.send('service_tooaolo', 'template_hunhf49', data, 'Q2S2tHcqfGEqMnk-1').then((result) =>{
                console.log(result.text);
            }, (error) => {
                console.log(error.txt)
            })
        }
        
    

    const addPlayerGame = async(game) =>{
        try {
            await addPlayGame(game.id)
            await getDetailGame(game.id)
            alert("Te has registrado correctamente, En breves recibiras un correo con la dirección exacta de la partida")
            const data = {email : auth.currentUser.email, name : auth.currentUser.displayName, address : game.address, nameGame : game.name}
            sendEmail(data)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelRegister = async (game) => {
        await deletePlayGame(playedByAuth[0].id)
    }
    

    const formatNumber = number => {
       return new Intl.NumberFormat('es-ES').format(parseInt(number))
    }

    const numRegistered = id => {
        const f = playersGame.filter(game => (game.gameId === id))
        return f.length
    }


    console.log(current)
    console.log(playedByAuth)
    return ( 
        <>
        <h2 className="my-3">Detalles</h2>
        <div className="registerDetail">
        <div className="separador">
        <div className="containerDetalles">
            <h4>{current[0].name}</h4>
            <ul>
            <li><h6>Fecha: </h6>{toDate(current[0].start.seconds)}</li>
            <li><h6>Hora: </h6>{toTime(current[0].start.seconds)} h</li>
            <li><h6>Ciudad: </h6>{current[0].city}</li>
            <li><h6>Buy In: </h6>{current[0].buyin} €</li>
            <li><h6>Stack Inicial: </h6>{formatNumber(current[0].stackInicial)}</li>
            <li><h6>Niveles: </h6>{current[0].levels} minutos</li>
            <li><h6>Nº de jugadores: </h6>{numRegistered(current[0].id)}/{current[0].maxPlayers}</li>
            <li><h6>Tamaño de mesa: </h6>{current[0].playersXtable} jugadores</li>
            {current[0].lateRegister ?
            
                <li><h6>Niveles de Tardío: </h6>{current[0].lateLevels}</li> :
                <li><h6>Sin Registro Tardío</h6></li>
            
            }
            {current[0].addon && 
            <>
                <li><h6>Precio Addon: </h6>{current[0].addonPrice} €</li>
                <li><h6>Puntos Addon: </h6>{formatNumber(current[0].addonChips)}</li>
                <li><h6>Nivel Addon: </h6>{current[0].addonLevel}</li>
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
                        <Link to = {"/profile/" + player.uid} style={{ textDecoration: 'none'}}> <td>{player.displayName}</td></Link>
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