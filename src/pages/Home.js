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
      <h1 className="center" style={{marginTop: '10%'}}>Welcome to Workplace Simulation!</h1>
      <div className="center">
        <div className="box">
          <h1 style={{ color: '#404BE3', fontSize: '36px' }}>Login</h1>
          <p><input onChange={handleChange} onKeyDown={handleKey} value={input} placeholder="Enter Simulation ID Here:"/></p>
          <p><button onClick={handleClick}>Submit</button></p>
        </div>
      </div>
    </>
  )
}

export default Home;