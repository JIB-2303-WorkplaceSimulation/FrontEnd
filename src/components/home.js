import { Link } from "react-router-dom";
import React from "react";

function home () {
   return (
      <div background-color="green">
        <h1>Home Page</h1>
      <br />
      <ul>
        <li>
          <Link to="/admin_page">Administrator Utils Page</Link>
        </li>
        <li>
          <Link to="/sim_page">Spinning Cube / Simulation Page</Link>
        </li>
      </ul>
      </div>
    )
}
  
export default home;