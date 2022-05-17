import { useFirestore } from "../hooks/useFirestore";
import { useEffect } from "react";
import rebuyImg from '../resources/rebuy.png'
import addonImg from '../resources/addon.png'
import lateImg from '../resources/late.png'

const MyGames = () => {

    const {data, error, loading, getDataMyGame} =  useFirestore()

    useEffect(() => {
        console.log(data)
        getDataMyGame()
    }, [])

    if(loading) return <p>Loading data...</p>
    if(error) return <p>{error}</p>

    if(data.length === 0) return <h2>No has creado ninguna partida</h2>
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
                data.map(item => (

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