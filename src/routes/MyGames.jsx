import { FirestoreContext } from "../context/UseFirestore";
import { useContext } from "react";
import rebuyImg from '../resources/rebuy.png'
import addonImg from '../resources/addon.png'
import lateImg from '../resources/late.png'

const MyGames = () => {

    const {created, error, loading} =  useContext(FirestoreContext)


    if(loading) return <p>Loading data...</p>
    if(error) return <p>{error}</p>

    let today = Math.floor(new Date().getTime())/1000

    console.log(today)

    const toDate = second => {
      let date = new Date(second*1000)
      var day = date.getDate();
      if(day < 10) day = "0"+day
      var month = date.getMonth()+1;
      if(month < 10) month = "0"+month
      var year = date.getFullYear();
      return `${day}/${month}/${year}`
    }

    const toTime = second => {
      let time = new Date(second * 1000)
      var hour = time.getHours()
      if(hour < 10) hour = "0"+hour
      var minute = time.getMinutes()
      if(minute < 10) minute = "0"+minute
      return `${hour}:${minute}`
    }


    if(created.length === 0) return <h2>No has creado ninguna partida</h2>
    return (
        <div>
        <h2>Partidas Creadas</h2>
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
            {
                created.map(item => (

                    <tbody key = {item.id}>
                    <tr >
                         <td>12/02</td>
                         <td>20:00</td>
                         <td>{item.name}</td>
                         <td>{item.city}</td>
                         <td>{item.rebuy && <img src={rebuyImg} alt="Rebuy" width={17}/>}
                         {item.addon && <img src={addonImg} alt="addon" width={17}/>}
                         {item.lateRegister && <img src={lateImg} alt="late" width={17}/>}</td>
                         <td className="tableCenter">{item.buyin} €</td>
                         <td className="tableCenter">4/{item.maxPlayers}</td>
                    </tr>
                    </tbody>
                ))
            }
            </table>
            </div>
        </div>
     );
}
 
export default MyGames;