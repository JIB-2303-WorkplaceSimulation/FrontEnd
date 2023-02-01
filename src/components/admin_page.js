import React from "react";
import { Link } from "react-router-dom";
import './admin_page.css'
  
const body = [["Alec Violette"], ["Karthik Sundar"], ["Aditya Sasanur"],
["Weilong Shen"], ["Pranav Avula"], ["Sunjin Im"]];
const admin_page = () => {
  return (
    <div>
        <h1>Administrator Utils Page</h1>
        <ul>
            <li>
              <Link to="/home">Back to Home</Link>
            </li>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Remove User Button</th>
                </tr>
              </thead>
              
              <tbody>
                {body.map(name => 
                <tr>
                  {name.map(val => <td>{val}</td>)}
                  <td><button>Remove User</button></td>
                </tr>
                )}
              </tbody>
            </table>
        </ul>
    </div>
  );
};
  
export default admin_page;