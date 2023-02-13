import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import SimList from "./pages/SimList"

function App() {
  return (
    <BrowserRouter className="App">
		  <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="simlist/:simID" element={<SimList/>} />
      </Routes>
	  </BrowserRouter>
  )
}

export default App;
