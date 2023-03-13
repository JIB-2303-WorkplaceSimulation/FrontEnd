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
        <div className="box">
          <h1 style={{ color: 'black', fontSize: '28px' }}>Enter your Simulation ID to proceed</h1>
          <p><input onChange={handleChange} onKeyDown={handleKey} value={input} placeholder="Enter Simulation ID Here:"/></p>
          <p><button onClick={handleClick}>Submit</button></p>
          <p>(Only simulation ID 10 works at this time - entering other IDs will take us to a page with empty tables)</p>
        </div>
      </div>
    </>
  )
}

export default Home;

