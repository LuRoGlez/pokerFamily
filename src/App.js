import './css/bootstrap.min.css'
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import { UserContext } from './context/UserProvider';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';
import { useContext } from 'react';
import CreateGame from './routes/CreateGame';
import GamesPlayed from './routes/GamesPlayed';
import MyGames from './routes/MyGames';

function App() {

  const { user } = useContext(UserContext)

  if (user === false) {
    return <p>Loading...</p>
  }
 

  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element = { 
                                    <RequireAuth>
                                      <Home />
                                    </RequireAuth>
                                  } />
          <Route path="/createGame" element = { 
                                    <RequireAuth>
                                      <CreateGame />
                                    </RequireAuth>
                                  } />
          <Route path="/myGames" element = { 
                                    <RequireAuth>
                                      <MyGames />
                                    </RequireAuth>
                                  } />
          <Route path="/gamesPlayed" element = { 
                                    <RequireAuth>
                                      <GamesPlayed />
                                    </RequireAuth>
                                  } />
          <Route path = "/login" element ={<Login />} />
          <Route path = "/register" element ={<Register />} />
          
        </Routes>
      </Router>
  )
}

export default App;
