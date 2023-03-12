import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
// import dummy_data from './dummy_data.json';
import axios from 'axios';

function SimList(){
  //console.log("this is dummy data, name: " + dummy_data.name);
  let params = useParams();
  var id = parseInt(params.simID);
  const [input, setInput] = useState([]);


  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    axios.get("https://jsv2r3kn.directus.app/items/Furniture").then
  ((result) => {
     setInput(result.data.data);
    })
    .catch((err) => {
        console.log(err);
    });
  }, [], input);


  const checkID = (inp) => {
    return (
      <div>
        <p className="center">The Simulation ID input is {inp}</p>
        <p className="center">This data is from our Directus database</p>
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

  console.log(input);

  const DisplayData = input.filter(obj => obj.sim_id === id).map(
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
