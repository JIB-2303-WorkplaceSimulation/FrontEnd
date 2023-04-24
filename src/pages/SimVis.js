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
  // const [unclicked, setUnclicked] = useState({ visible: false, furnitureId: null });
  // const [position, setPosition] = useState(null);

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
    if (simulationSpeed !== 0){
      setStoredSimulationSpeed(simulationSpeed)
    }
    setSimulationSpeed(0)
  }

  const save = () => {
    // Check for overlapping
    for (let f1 of furniture) {
      for (let f2 of furniture) {
        if (f1.id < f2.id) {
          let f1_x_len = f1.type === "Table" ? f1.x_length : 1
          let f2_x_len = f2.type === "Table" ? f2.x_length : 1
          let f1_z_len = f1.type === "Table" ? f1.z_length : 1
          let f2_z_len = f2.type === "Table" ? f2.z_length : 1
          if (f1.x_coord - f2.x_coord > (f1_x_len+f2_x_len)/-2 
          && f1.x_coord - f2.x_coord < (f1_x_len+f2_x_len)/2
          && f1.z_coord - f2.z_coord > (f1_z_len+f2_z_len)/-2 
          && f1.z_coord - f2.z_coord < (f1_z_len+f2_z_len)/2) {
            alert("Saving failed. There are overlapping items. Please fix them before saving.");
            return;
          }
        }
      }
    }
    getToken().then(token => {
      for (let f of furniture) {
        updateCoordinates(f.id, token, f.x_coord, f.z_coord)
      }
    })
    alert("Furniture positions have been saved successfully")
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
    console.log(furniture)
  };
  
  const addWorker = () => {
    const newID = Math.max(...worker.map(w => w.id), 0) + 1;
  
    const newWorker = {
      id: newID,
      Worker_Name: "Worker",
      sim_id: id,
      x_coord: 5,
      z_coord: 5,
      roomWID: 4,
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
            key = {f.id}
            f = {f}
            room={rooms.filter((r) => f.room_id === r.id)}
            onRemove={(f, clicked) => {
              setRemoveButton({ visible: clicked, furnitureId: f });
            }}
            
            onUnclicked={(f) => {
              for (let i of furniture) {
                  if (i.id === f.id) {
                    i.x_coord = f.x_coord;
                    i.z_coord = f.z_coord;
                  }
              }
            }}
          />
        })
      }
      
      {worker
        .filter((guy) => guy.sim_id === id)
        .map((guy) => {
          return <Worker key={guy.id} maxX = {maxX} maxZ = {maxZ} minX = {minX} minZ = {minZ} initialPos = {[guy.x_coord,0.5,guy.z_coord]} simulationSpeed = {simulationSpeed} room = {rooms.filter((r) => r.id === guy.roomWID)[0]}/>
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
    <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: 10, left: 190, zIndex: 1 }}>
      <button onClick={save} style={{width: '60px'}}> Save </button> 
    </div>
    <div className="flex-container" style={{ position: 'absolute', top: 90, left: 10, zIndex: 1 }}>
      <button style={{ width: '120px', height: '25%'}}> <img style={{height: '100%', maxHeight: '110px', alignContent: 'center'}} src={table} alt="" onClick={addTable}/> </button>
      <button style={{ width: '120px', height: '25%'}}> <img style={{height: '100%', maxHeight: '110px', alignContent: 'center'}} src={chair} alt="" onClick={addChair}/> </button>
      <button style={{ width: '120px', height: '25%'}}> <img style={{height: '100%', maxHeight: '110px', alignContent: 'center'}} src={dude} alt="" onClick={addWorker}/> </button>
    </div>
    {removeButton.visible && (
      <div className="flex-container" style={{ width: '310px', position: 'absolute', top: 90, right: 10, zIndex: 1 }}>
        <div > Name: {removeButton.furnitureId.Name} </div>
        <div > Type: {removeButton.furnitureId.type} </div>
        <div > ID: {removeButton.furnitureId.id} </div>
        <div > Location: ({removeButton.furnitureId.x_coord}, {removeButton.furnitureId.z_coord}) </div>
        <div > Worker: () </div>
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
