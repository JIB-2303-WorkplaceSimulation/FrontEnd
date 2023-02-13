import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
//import styles from "../App.css";

function Dummy(){
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    if (input.length === 5) navigate("simlist/"+input);
    else {
      setInput("");
      alert("The length of the ID you entered is incorrect. Please enter a 5-digit Simulation ID.")
    }
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <>
      <h1 style={{textAlign: "center"}}>Welcome to Workplace Simulation!</h1>
      <h2 style={{textAlign: "center"}}>Please Login</h2>
      <div style={{textAlign: "center"}}>
          <label>
              <p>Enter your 5-digit Simulation ID to proceed</p>
              <input onChange={handleChange} value={input} placeholder="Enter Simulation ID Here"/>
          </label>
          <div>
              <button onClick={handleClick}>Submit</button>
          </div>
      </div>
    </>
  )
}

export default Dummy;