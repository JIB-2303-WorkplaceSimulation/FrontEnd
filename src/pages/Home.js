import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Home(){
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    if (!(/^\d+$/.test(input))) {
      setInput("");
      alert("The simulation ID should only contain numbers.")
    } else {
      navigate("simlist/"+input);
    }
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleKey = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };
  return (
    <>
      <h1 className="center">Welcome to Workplace Simulation!</h1>
      <h2 className="center">Please Login</h2>
      <div className="center">
        <p>Enter your 5-digit Simulation ID to proceed</p>
        <p><input onChange={handleChange} onKeyDown={handleKey} value={input} placeholder="Enter Simulation ID Here"/></p>
        <p><button onClick={handleClick}>Submit</button></p>
      </div>
      <p className="center">Updated Tuesday, February 14, 2023 by William. As a starting point, I have set
      this program to only take a 5-digit number as the simulation ID. We can change this later if there is
      need. Feel free to play around with the program, including invalid simulation ID inputs, invalid 
      URLs, and others. Let me know if there is any problems with this.</p>
    </>
  )
}

export default Home;
