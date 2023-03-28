import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import * as THREE from 'three';
import axios from 'axios';
import Worker from '../objects/worker.js';
import Furniture from '../objects/furniture.js';
import Room from '../objects/room.js';
import table from '../images/Table.png'


function SimVis() {
  const groupRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [furnitureIds, setFurnitureIds] = useState([]);
  const id = parseInt(window.location.pathname.substring(8));
  const [workerPosition, ] = useState([0,0.5,1]);
  const [workerSpeed, ] = useState([.5,.5]);
  const [simulationSpeed, setSimulationSpeed] = useState(10);
  const [storedsimulationSpeed, setStoredSimulationSpeed] = useState(10);
  var minX = 1000;
  var minZ = 1000;
  var maxX = -1000;
  var maxZ = -1000;
  // console.log(simulationSpeed)

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
    setStoredSimulationSpeed(simulationSpeed)
    setSimulationSpeed(0)
  }
  const play = () => {
    setSimulationSpeed(storedsimulationSpeed)
  }
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <Worker maxX = {maxX} maxZ = {maxZ} minX = {minX} minZ = {minZ} initialPos = {workerPosition} speed = {workerSpeed} simulationSpeed = {simulationSpeed} rooms = {rooms}/>
      <OrbitControls enableDamping maxPolarAngle={Math.PI/2} />
      <ambientLight intensity={0.1} />
      <ambientLight color={ 0xffffff } position={[0, 10, 5]} />
      {rooms
        .filter((room) => room.sim_id === id)
        .map((room) => {
          return <Room key={room.id} room = {room}/>
        })
      }
      {furniture
        .filter((f) => furnitureIds.includes(f.id))
        .map((f) => {
          return <Furniture key={f.id} f = {f}/>
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
    <div className="selector" style={{position: 'absolute', top: 90, left: 10}}>
    <button style={{ marginTop: '15px', marginLeft: '25px', width: '120px', height: '20%'}}> <img style={{height: '100%', alignContent: 'center'}} src={table} alt="my image" onClick={pause}/> </button>
    <button style={{ marginTop: '15px', marginLeft: '25px', width: '120px', height: '20%'}}> <img style={{height: '100%', alignContent: 'center'}} src={table} alt="my image" onClick={pause}/> </button>
    <button style={{ marginTop: '15px', marginLeft: '25px', width: '120px', height: '20%'}}> <img style={{height: '100%', alignContent: 'center'}} src={table} alt="my image" onClick={pause}/> </button>
    <button style={{ marginTop: '15px', marginLeft: '25px', width: '120px', height: '20%'}}> <img style={{height: '100%', alignContent: 'center'}} src={table} alt="my image" onClick={pause}/> </button>
    </div>
  </div>
  );
};

export default SimVis;