import { FirestoreContext } from "../context/UseFirestore";
import { useContext, useState, useEffect } from "react";
import rebuyImg from "../resources/rebuy.png";
import addonImg from "../resources/addon.png";
import lateImg from "../resources/late.png";
import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom"
import Swal from "sweetalert2";


const MyGames = () => {
  const { data, getDataGame, getPlayersGame, playersGame, deleteGame } = useContext(FirestoreContext);

  const [current, setCurrent] = useState();

  useEffect(() => {
    getDataGame();
  }, []);

  let today = Math.floor(new Date().getTime()) / 1000;

  const getDetailGame = (gameId) => {
    try {
      setCurrent(data.filter((game) => game.id === gameId));
      getPlayersGame(gameId);
    
    } catch (error) {
      
    }
  };

  const created = data.filter((item) => item.uid === auth.currentUser.uid);

  const toDate = (second) => {
    let date = new Date(second * 1000);
    var day = date.getDate();
    if (day < 10) day = "0" + day;
    var month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toTime = (second) => {
    let time = new Date(second * 1000);
    var hour = time.getHours();
    if (hour < 10) hour = "0" + hour;
    var minute = time.getMinutes();
    if (minute < 10) minute = "0" + minute;
    return `${hour}:${minute}`;
  };

  const formatNumber = number => {
    return new Intl.NumberFormat('es-ES').format(parseInt(number))
 }

 const numRegistered = id => {
     const f = playersGame.filter(game => (game.gameId === id))
     return f.length
 }

 const removeGame = async (gameId) => {
     await deleteGame(gameId)
     Swal.fire(
      'Partida Eliminada',
      '',
      'warning'
    )
 }

  if (created.length === 0) return <h2 className="my-5">No has creado ninguna partida</h2>;
  return (
    <>
      <div className="containerHome">
        <div className="containerGames">
            <div>
          <h2 className="my-3">Partidas Creadas</h2>
          <div className="containerTable">
            <table>
              <thead>
                <tr>
                  <th className="fechaTable">Fecha</th>
                  <th className="horaTable">Hora</th>
                  <th className="nombreTable">Nombre</th>
                  <th className="ciudadTable">Ciudad</th>
                  <th className="caracteristicasTable"></th>
                  <th className="buyinTable">Buy-In</th>
                  <th className="jugadoresTable">Jugadores</th>
                </tr>
              </thead>
              {created.map((item) => (
                <tbody
                  key={item.id}
                  className="itemsGame"
                  onClick={() => getDetailGame(item.id)}
                >
                  <tr
                    className={
                      current && item.id === current[0].id ? "selected" : ""
                    }
                  >
                    <td>{toDate(item.start.seconds)}</td>
                    <td>{toTime(item.start.seconds)}</td>
                    <td>{item.name}</td>
                    <td>{item.city}</td>
                    <td>
                      {item.rebuy && (
                        <img src={rebuyImg} alt="Rebuy" width={17} />
                      )}
                      {item.addon && (
                        <img src={addonImg} alt="addon" width={17} />
                      )}
                      {item.lateRegister && (
                        <img src={lateImg} alt="late" width={17} />
                      )}
                    </td>
                    <td className="tableCenter">{item.buyin} ???</td>
                    <td className="tableCenter">{item.maxPlayers}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
      { current &&
      <div className="containerDetail">
               <h2 className="my-3">Detalles</h2>
        <div className="registerDetail">
        <div className="separador">
        <div className="containerDetalles">
            <h4>{current[0].name}</h4>
            <ul>
            <li><span>Fecha: </span>{toDate(current[0].start.seconds)}</li>
            <li><span>Hora: </span>{toTime(current[0].start.seconds)} h</li>
            <li><span>Ciudad: </span>{current[0].city}</li>
            <li><span>Buy In: </span>{current[0].buyin} ???</li>
            <li><span>Stack Inicial: </span>{formatNumber(current[0].stackInicial)}</li>
            <li><span>Niveles: </span>{current[0].levels} minutos</li>
            <li><span>N?? de jugadores: </span>{numRegistered(current[0].id)}/{current[0].maxPlayers}</li>
            <li><span>Tama??o de mesa: </span>{current[0].playersXtable} jugadores</li>
            {current[0].lateRegister ?
            
                <li><span>Niveles de Tard??o: </span>{current[0].lateLevels}</li> :
                <li><span>Sin Registro Tard??o</span></li>
            
            }
            {current[0].addon && 
            <>
                <li><span>Precio Addon: </span>{current[0].addonPrice} ???</li>
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
        {current[0].start.seconds > today ?
      <button 
          className="btn btn-info"
          onClick={() => removeGame(current[0].id)}
          >Eliminar Partida
          </button> :
           <button 
           className="btn btn-dark"
           >Partida Finalizada
           </button>
}
       </div>     
        </div>
      </div>
}
      </div>
    </>
  );
};

export default MyGames;
