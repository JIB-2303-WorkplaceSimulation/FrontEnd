import React from 'react';
import {Link, useParams} from 'react-router-dom';
import dummy_data from './dummy_data.json';

function SimList(){
  //console.log("this is dummy data, name: " + dummy_data.name);
  let params = useParams();
  var id = params.simID;
  const checkID = (inp) => {
    if (inp.length !== 5) return(
      <div>
        <p className="center">Simulation ID is invalid, please return to home page</p>
        <p className="center"><Link to="/" class="link">Back to home page</Link></p>
      </div>
    );
    return (
      <div>
        <p className="center">The Simulation ID input is {inp}</p>
        <p className="center">Here is a table with dummy data from "src/pages/dummy_data.json"</p>
        <p className="center">When Directus API is figured out, I will change this table to show contents in our database, like furniture and their xyz locations.</p>
        <table className="center">
          <thead>
            <tr>
              <th>x-coordinate</th>
              <th>y-coordinate</th>
              <th>z-coordinate</th>
              <th>Type</th>
              <th>Simulation ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {DisplayData}
          </tbody>
        </table>
        <p className="center"><Link to="/" className="link">Back to home page</Link></p>
      </div>
    );
  }
  const DisplayData = dummy_data.map(
    (info)=>{
        return(
            <tr key={info.id}>
                <td>{info.x_coord}</td>
                <td>{info.y_coord}</td>
                <td>{info.z_coord}</td>
                <td>{info.type}</td>
                <td>{info.sim_id}</td>
                <td>{info.Name}</td>
            </tr>
        )
    }
  )
  return (
    <div>
      {checkID(id)}
    </div>
  );
}

export default SimList;
