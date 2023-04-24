import {React, useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';



export default function SimList(){
  let params = useParams();
  var id = parseInt(params.simID);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [workers, setWorkers] = useState([]);
  var furniture_ids = [];
  const handleClick = () => {
    navigate("../simvis/"+id);
  };


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

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    axios.get("https://jsv2r3kn.directus.app/items/Worker").then
  ((result) => {
     setWorkers(result.data.data);
    })
    .catch((err) => {
        console.log(err);
    });
  }, [], workers);

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
        <p className="center">The Simulation ID input is <span style={{ fontWeight: 'bold', color: '#FFC0CB' }}>{inp}</span></p>
        <p className="center">This data is from our Directus database</p>
        <p className="center">All rooms in this simulation instance:</p>
        <table className="center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Corner_1_x</th>
              <th>Corner_1_z</th>
              <th>Corner_2_x</th>
              <th>Corner_2_z</th>
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
              <th>z-coordinate</th>
            </tr>
          </thead>
          <tbody>
            {DisplayFurnitureData}
          </tbody>
        </table>
        <p className="center"><button style={{ width: "100px", height: "50px",}} onClick={handleClick}>Go to Simulation</button></p>
        <p className="center"><Link to="/" className="link">Back to home page</Link></p>
      </div>
    ); 
  }

    //Displaying the furniture data in table format with JS map function.

  const DisplayFurnitureData = furniture.filter(obj => furniture_ids.includes(obj.id)).map(
    (info)=>{
        return(
            <tr key={info.id}>
                <td>{info.Name}</td>
                <td>{info.type}</td>
                <td>{info.x_coord}</td>
                <td>{info.z_coord}</td>
            </tr>
        )
    }
  )

  //Displaying the room data in table format with JS map function.

  const DisplayRoomData = rooms.filter(obj => obj.sim_id === id).map(
    (info)=>{
        return(
          <tr key={info.id}>
              <td>{info.room_name}</td>
              <td>{info.Corner1_xcoord}</td>
              <td>{info.Corner1_zcoord}</td>
              <td>{info.Corner2_xcoord}</td>
              <td>{info.Corner2_zcoord}</td>
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
