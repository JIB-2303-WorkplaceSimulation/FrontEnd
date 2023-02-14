import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Home(){
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    if (input.length !== 5) {
      setInput("");
      alert("The length of the ID you entered is incorrect. Please enter a 5-digit Simulation ID.")
    } else if (!(/^\d+$/.test(input))) {
      setInput("");
      alert("The simulation ID should only contain numbers.")
    } else {
      navigate("simlist/"+input);
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
        <p>Enter your 5-digit Simulation ID to proceed</p>
        <p><input onChange={handleChange} value={input} placeholder="Enter Simulation ID Here"/></p>
        <p><button onClick={handleClick}>Submit</button></p>
      </div>
    </>
  )
}

export default Home;
