import React from 'react';
import {Link, useParams} from 'react-router-dom';

function SimList(){
  let params = useParams();
  var id = params.simID;
  if (id.length !== 5 || !(/^\d+$/.test(id))) id = "invalid"
  return (
    <div>
      <p style={{textAlign: "center"}}>This is a dummy page, will display furniture data from Directus later</p>
      <p style={{textAlign: "center"}}>Simulation ID is {id}</p>
      <p style={{textAlign: "center"}}><Link to="/">Back to home page</Link></p>
    </div>
  );
}

export default SimList;
