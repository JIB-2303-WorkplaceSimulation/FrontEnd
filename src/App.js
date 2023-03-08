import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home.js";
import SimList from "./pages/SimList.js"
import SimVis from "./pages/SimVis.js"
import Unspecified from "./pages/Unspecified.js"

export default function App() {
  return (
    <BrowserRouter className="App">
		  <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="simlist/:simID" element={<SimList/>} />
        <Route path="simvis" element={<SimVis/>} />
        <Route path="/*" element={<Unspecified/>} />
      </Routes>
	  </BrowserRouter>
  )
}
