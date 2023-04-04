import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import * as THREE from 'three';
import axios from 'axios';
import Worker from '../objects/worker.js';
import Furniture from '../objects/furniture.js';
import Room from '../objects/room.js';
import table from '../images/Table.png'
import chair from '../images/Chair.png'
import dude from '../images/Worker.png'


function SimVis() {
  const groupRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [worker, setWorker] = useState([]);
  const [furnitureIds, setFurnitureIds] = useState([]);
  const id = parseInt(window.location.pathname.substring(8));
  const [simulationSpeed, setSimulationSpeed] = useState(10);
  const [storedsimulationSpeed, setStoredSimulationSpeed] = useState(10);
  const [removeButton, setRemoveButton] = useState({ visible: false, furnitureId: null });
  var minX = 1000;
  var minZ = 1000;
  var maxX = -1000;
  var maxZ = -1000;

  useEffect(() => {
    axios
      .get('https://jsv2r3kn.directus.app/items/Room')
      .then((result) => {
        setRooms(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://jsv2r3kn.directus.app/items/Furniture')
      .then((result) => {
        setFurniture(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://jsv2r3kn.directus.app/items/Worker')
      .then((result) => {
        setWorker(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const newFurnitureIds = [];
    rooms.filter((obj) => obj.sim_id === id).forEach((info) => {
      info.room_furniture.forEach((furnitureId) => {
        newFurnitureIds.push(furnitureId);
      });
    });
    setFurnitureIds(newFurnitureIds);
  }, [rooms, id]);
  
  rooms.forEach(element => {
    minX = Math.min(minX, element.Corner1_xcoord, element.Corner2_xcoord);
    minZ = Math.min(minZ, element.Corner1_zcoord, element.Corner2_zcoord);
    maxX = Math.max(maxX, element.Corner1_xcoord, element.Corner2_xcoord);
    maxZ = Math.max(maxZ, element.Corner1_zcoord, element.Corner2_zcoord);
  });

  const increaseSpeed = () => {
    if (simulationSpeed > 1) {
      setSimulationSpeed(simulationSpeed - 1)
    }
  }
  const decreaseSpeed = () => {
    setSimulationSpeed(simulationSpeed + 1)
  }
  const pause = () => {
    if (simulationSpeed != 0){
      setStoredSimulationSpeed(simulationSpeed)
    }
    setSimulationSpeed(0)
    getToken().then(token => {
      for (let f of furniture) {
        console.log("prnt" + f )
        updateCoordinates(f.id, token, f.x_coord, f.z_coord)
      }
    })

    
  }

  const updateCoordinates = (id, token, x_coord, z_coord) => {
    var data = JSON.stringify({
      "x_coord": x_coord,
      "z_coord": z_coord

    });
    
    var config = {
      method: 'patch',
      url: `https://jsv2r3kn.directus.app/items/Furniture/${id}`,
      headers: {  
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getToken = () => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        "email": "admin@email.com",
        "password": "admin"
      });
      
      var config = {
        method: 'post',
        url: 'https://jsv2r3kn.directus.app/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        resolve(response.data.data["access_token"])
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
    })
    
  }


  const play = () => {
    setSimulationSpeed(storedsimulationSpeed)
  }
  const addTable = () => {
    const newID = Math.max(...furnitureIds) + 1;
    setFurnitureIds((prevFurnitureIds) => [...prevFurnitureIds, newID]);
  
    const newRoom = { ...rooms[0] };
    newRoom.room_furniture = [...newRoom.room_furniture, newID];
    setRooms((prevRooms) => [newRoom, ...prevRooms.slice(1)]);
  
    const newFurnitureItem = {
      id: newID,
      type: "Table",
      Name: "Table",
      room_id: newRoom.id,
      x_coord: 0,
      z_coord: 0,
      x_length: 2,
      z_length: 2,
      face_direction: "North",
    };
    setFurniture((prevFurniture) => [...prevFurniture, newFurnitureItem]);
  };
  const addChair = () => {
    const newID = Math.max(...furnitureIds) + 1;
    setFurnitureIds((prevFurnitureIds) => [...prevFurnitureIds, newID]);
  
    const newRoom = { ...rooms[0] };
    newRoom.room_furniture = [...newRoom.room_furniture, newID];
    setRooms((prevRooms) => [newRoom, ...prevRooms.slice(1)]);
  
    const newFurnitureItem = {
      id: newID,
      type: "Chair",
      Name: "Chair",
      room_id: newRoom.id,
      x_coord: 0,
      z_coord: 0,
      x_length: 0,
      z_length: 0,
      face_direction: "North",
    };
    setFurniture((prevFurniture) => [...prevFurniture, newFurnitureItem]);
  };
  
  const addWorker = () => {
    const newID = Math.max(...worker.map(w => w.id), 0) + 1;
  
    const newWorker = {
      id: newID,
      Worker_Name: "Worker",
      sim_id: id,
      x_coord: 0,
      z_coord: 0
    };
    setWorker((prevWorker) => [...prevWorker, newWorker]);
  };

  const removeFurniture = (furnitureId) => {
    setFurniture((prevFurniture) => prevFurniture.filter((f) => f.id !== furnitureId));
  
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.room_furniture.includes(furnitureId)) {
          return {
            ...room,
            room_furniture: room.room_furniture.filter((id) => id !== furnitureId),
          };
        }
        return room;
      })
    );
  };
  console.log(rooms)
  console.log(worker)
  console.log(id)
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <OrbitControls enableDamping maxPolarAngle={Math.PI/2} />
      <ambientLight intensity={0.1} />
      <ambientLight color={ 0xffffff } position={[0, 10, 5]} />
      {/* <Worker maxX = {maxX} maxZ = {maxZ} minX = {minX} minZ = {minZ} initialPos = {[0,0,0]} simulationSpeed = {simulationSpeed} rooms = {rooms}/> */}
      {rooms
        .filter((room) => room.sim_id === id)
        .map((room) => {
          return <Room key={room.id} room = {room}/>
        })
      }
      {furniture
        .filter((f) => furnitureIds.includes(f.id))
        .map((f) => {
          return <Furniture
            f = {f}
            onRemove={(f, clicked) => {
              setRemoveButton({ visible: clicked, furnitureId: f });
            }}
          />
        })
      }
      {worker
        .filter((guy) => guy.sim_id === id)
        .map((guy) => {
          return <Worker maxX = {maxX} maxZ = {maxZ} minX = {minX} minZ = {minZ} initialPos = {[guy.x_coord,0.5,guy.z_coord]} simulationSpeed = {simulationSpeed} rooms = {rooms}/>
        })
      }
      <PerspectiveCamera near={0.1} far={1000} position={[0, 0, 0]} lookAt={groupRef.current ? groupRef.current.position : [0, 0, 0]} />
    </Canvas>
    <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
      <button onClick={increaseSpeed} style={{marginBottom: '10px'}}> Inc. Speed </button>
      <button onClick={decreaseSpeed}> Dec. Speed </button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: 10, left: 120, zIndex: 1 }}>
      <button onClick={play} style={{marginBottom: '10px', width: '60px'}}> Play </button>
      <button onClick={pause} style={{width: '60px'}}> Pause </button>
    </div>
    <div class="flex-container" style={{ position: 'absolute', top: 90, left: 10, zIndex: 1 }}>
      <button style={{ width: '120px', height: '25%'}}> <img style={{height: '100%', maxHeight: '110px', alignContent: 'center'}} src={table} alt="my image" onClick={addTable}/> </button>
      <button style={{ width: '120px', height: '25%'}}> <img style={{height: '100%', maxHeight: '110px', alignContent: 'center'}} src={chair} alt="my image" onClick={addChair}/> </button>
      <button style={{ width: '120px', height: '25%'}}> <img style={{height: '100%', maxHeight: '110px', alignContent: 'center'}} src={dude} alt="my image" onClick={addWorker}/> </button>
    </div>
    {removeButton.visible && (
      <div class="flex-container" style={{ width: '310px', position: 'absolute', top: 90, right: 10, zIndex: 1 }}>
        <div > Name: {removeButton.furnitureId.Name} </div>
        <div > Type: {removeButton.furnitureId.type} </div>
        <div > ID: {removeButton.furnitureId.id} </div>
        <div > Location: ({removeButton.furnitureId.x_coord}, {removeButton.furnitureId.z_coord}) </div>
        <div style={{backgroundColor: '#404BE3'}}> </div>
        <button 
          style={{ width: '170px', height: '15%', backgroundColor: '#9c1515', fontSize: '3.5vh'}} 
            onClick={() => {
              removeFurniture(removeButton.furnitureId.id);
              setRemoveButton({ visible: false, furnitureId: null });
            }}>
            DELETE
        </button>
      </div>
    )}
  </div>
  );
};

export default SimVis;