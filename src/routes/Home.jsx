import React from 'react'
import CurrentGame from '../components/CurrentGame'
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";

import rebuyImg from '../resources/rebuy.png'
import addonImg from '../resources/addon.png'
import lateImg from '../resources/late.png'

const Home = () => {

  const {data, error, loading, getDataGame} =  useFirestore()
  const [current, setCurrent] = useState()

    useEffect(() => {
        getDataGame()
    }, [])

    if(loading) return <p>Loading data...</p>
    if(error) return <p>{error}</p>
    
    console.log(current)
    const getDetailGame =  (gameId) => {

       try {
           setCurrent(data.filter(item => item.id === gameId))
       } catch (error) {
        console.log(error)   
       }
        
    }

  return (
    <>
        <div className="containerHome">
        <div className="containerGames">
        <div>
            <h2>Partidas Disponibles</h2>
            
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
            
                    <tbody
                    onClick={() => getDetailGame(item.id)}
                    key = {item.id}>
                    <tr className={current && item.id === current[0].id ? 'selected' : ""}>
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
        </div>
        <div className="containerDetail">
          <CurrentGame 
           current = {current}
          />
        </div>
        </div>
        
    </>
  )
}

export default Home