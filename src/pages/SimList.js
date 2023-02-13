import React from 'react';
import {Link, useParams} from 'react-router-dom';

function SimList(){
  let params = useParams();
  return (
    <div>
      <p>This is the dummy Page</p>
      <l1>Simulation ID is {params.simID}</l1>
      <h2><Link to="/">back to home page</Link></h2>
    </div>
  );
}

export default SimList;