import './css/bootstrap.min.css'
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Header/>}>
        
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
