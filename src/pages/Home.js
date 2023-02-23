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
    </>
  )
}

export default Home;
