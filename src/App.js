import "./css/bootstrap.min.css";
import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";
import { UserContext } from "./context/UserProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import { useContext } from "react";
import CreateGame from "./routes/CreateGame";
import GamesPlayed from "./routes/GamesPlayed";
import MyGames from "./routes/MyGames";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile";
import EditComment from "./routes/EditComment";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Header />
      <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/createGame"
          element={
            <RequireAuth>
              <CreateGame />
            </RequireAuth>
          }
        />
        <Route
          path="/myGames"
          element={
            <RequireAuth>
              <MyGames />
            </RequireAuth>
          }
        />
        <Route
          path="/gamesPlayed"
          element={
            <RequireAuth>
              <GamesPlayed />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:playerId"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
         <Route
          path="/editComment/:commentId"
          element={
            <RequireAuth>
              <EditComment />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
