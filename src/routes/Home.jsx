import React from 'react'
import CurrentGame from '../components/CurrentGame'
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";

import rebuyImg from '../resources/rebuy.png'
import addonImg from '../resources/addon.png'
import lateImg from '../resources/late.png'
import { getDate, getDay, setDate } from 'date-fns';

const Home = () => {

  const {data, error, loading, getDataGame, getPlayersGame, playersGame, getAllPlayers, allPlayers} =  useFirestore()
  const [current, setCurrent] = useState()

    useEffect(() => {
        getDataGame()
        console.log(data)
        getAllPlayers()
    }, [])

    if(loading) return <p>Loading data...</p>
    if(error) return <p>{error}</p>
    
    console.log(current)

    const getDetailGame =  (gameId) => {
       try {
           setCurrent(data.filter(game => game.id === gameId))
            getPlayersGame(gameId)
            console.log(allPlayers)
           console.log(playersGame)
       } catch (error) {
        console.log(error)   
       }
        
    }
   
    
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
            
                    <tbody className='itemsGame'
                    onClick={() => getDetailGame(item.id)}
                    key = {item.id}>
                    <tr className={current && item.id === current[0].id ? 'selected' : ""}>
                         <td>{toDate(item.start.seconds)}</td>
                         <td>{toTime(item.start.seconds)}</td>
                         <td>{item.name}</td>
                         <td>{item.city}</td>
                         <td>{item.rebuy && <img src={rebuyImg} alt="Rebuy" width={17}/>}
                         {item.addon && <img src={addonImg} alt="addon" width={17}/>}
                         {item.lateRegister && <img src={lateImg} alt="late" width={17}/>}</td>
                         <td className="tableCenter">{item.buyin} €</td>
                         <td className="tableCenter">{item.maxPlayers}</td>
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
           playersGame = {playersGame}
           getDetailGame = {getDetailGame}
           allPlayers = {allPlayers}
           toTime = {toTime}
           toDate = {toDate}
          />
        </div>
        </div>
        
    </>
  )
}

export default Home