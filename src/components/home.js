import { Link } from "react-router-dom";
import React from "react";

function home () {
   return (
      <div background-color="green">
        <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/admin_page">Administrator Utils Page</Link>
        </li>
        <li>
          <Link to="/sim_page">Spinning Cube / Simulation Page</Link>
        </li>
      </ul>
      <h2 style={{textAlign: "center"}}>Please Login</h2>
      <form style={{textAlign: "center"}}>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
      
    )
}
  
export default home;