import React from 'react';
import {Link} from 'react-router-dom';

function Unspecified(){
  return (
    <div>
      <p className="center">This page does not exist. Please return to home.</p>
      <p className="center"><Link className="link" to="/">Back to home page</Link></p>
    </div>
  );
}

export default Unspecified;
