import React from 'react';
import {Link} from 'react-router-dom';

function Unspecified(){
  return (
    <div>
      <p style={{textAlign: "center"}}>This page does not exist. Please return to home.</p>
      <p style={{textAlign: "center"}}><Link to="/">Back to home page</Link></p>
    </div>
  );
}

export default Unspecified;
