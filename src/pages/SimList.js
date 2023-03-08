import {React, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
// import dummy_data from './dummy_data.json';
import axios from 'axios';



function SimList(){
  let params = useParams();
  var id = parseInt(params.simID);
  const [rooms, setRooms] = useState([]);
  const [furniture, setFurniture] = useState([]);
  var furniture_ids = [];


  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    axios.get("https://jsv2r3kn.directus.app/items/Room").then
  ((result) => {
     setRooms(result.data.data);
    })
    .catch((err) => {
        console.log(err);
    });
  }, [], rooms);

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    axios.get("https://jsv2r3kn.directus.app/items/Furniture").then
  ((result) => {
     setFurniture(result.data.data);
    })
    .catch((err) => {
        console.log(err);
    });
  }, [], furniture);

  rooms.filter(obj => obj.sim_id === id).forEach(
    (info)=>{
      function add(value) {
        furniture_ids.push(value)
      }
      info.room_furniture.forEach(add)
    }
  )

  const checkID = (inp) => {
    return (
      <div>
        <p className="center">The Simulation ID input is {inp}</p>
        <p className="center">This data is from our Directus database</p>
        <p className="center">All rooms in this simulation instance:</p>
        <table className="center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Corner_1_x</th>
              <th>Corner_1_y</th>
              <th>Corner_2_x</th>
              <th>Corner_2_y</th>
            </tr>
          </thead>
          <tbody>
            {DisplayRoomData}
          </tbody>
        </table>
        <p className="center">All furniture in this simulation instance:</p>
        <table className="center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>x-coordinate</th>
              <th>y-coordinate</th>
              <th>z-coordinate</th>
            </tr>
          </thead>
          <tbody>
            {DisplayFurnitureData}
          </tbody>
        </table>
        <p className="center"><Link to="/" className="link">Back to home page</Link></p>
      </div>
    ); 
  }
  const DisplayFurnitureData = furniture.filter(obj => furniture_ids.includes(obj.id)).map(
    (info)=>{
        return(
            <tr key={info.id}>
                <td>{info.Name}</td>
                <td>{info.type}</td>
                <td>{info.x_coord}</td>
                <td>{info.y_coord}</td>
                <td>{info.z_coord}</td>
            </tr>
        )
    }
  )
  const DisplayRoomData = rooms.filter(obj => obj.sim_id === id).map(
    (info)=>{
        return(
          <tr key={info.id}>
              <td>{info.room_name}</td>
              <td>{info.Corner1_xcoord}</td>
              <td>{info.Corner1_ycoord}</td>
              <td>{info.Corner2_xcoord}</td>
              <td>{info.Corner2_ycoord}</td>
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
