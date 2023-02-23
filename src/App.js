import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import SimList from "./pages/SimList"
import Unspecified from "./pages/Unspecified"

function App() {
  return (
    <BrowserRouter className="App">
		  <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="simlist/:simID" element={<SimList/>} />
        <Route path="/*" element={<Unspecified/>} />
      </Routes>
	  </BrowserRouter>
  )
}

export default App;
