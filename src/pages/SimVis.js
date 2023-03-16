import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import axios from 'axios';
import Worker from '../objects/worker.js';
import Furniture from '../objects/furniture.js';
import Room from '../objects/room.js';


function SimVis() {
  const groupRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [furnitureIds, setFurnitureIds] = useState([]);
  const id = parseInt(window.location.pathname.substring(8));
  const [workerPosition, setWorkerPosition] = useState([0,0.5,1]);
  const [workerSpeed, setWorkerSpeed] = useState([.5,.5]);
  const [simultionSpeed, setSimulationSpeed] = useState(10);
  const [storedSimultionSpeed, setStoredSimulationSpeed] = useState(10);
  var minX = 1000;
  var minZ = 1000;
  var maxX = -1000;
  var maxZ = -1000;
  console.log(simultionSpeed)

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
    if (simultionSpeed > 1) {
      setSimulationSpeed(simultionSpeed - 1)
    }
  }
  const decreaseSpeed = () => {
    setSimulationSpeed(simultionSpeed + 1)
  }
  const pause = () => {
    setStoredSimulationSpeed(simultionSpeed)
    setSimulationSpeed(0)
  }
  const play = () => {
    setSimulationSpeed(storedSimultionSpeed)
  }
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={increaseSpeed}>
        Inc. Speed
      </button>
      <button onClick={decreaseSpeed}>
        Dec. Speed
      </button>
      <button onClick={play}>
        Play
      </button>
      <button onClick={pause}>
        Pause
      </button>
      <Canvas>
        <Worker maxX = {maxX} maxZ = {maxZ} minX = {minX} minZ = {minZ} initialPos = {workerPosition} speed = {workerSpeed} simulationSpeed = {simultionSpeed} rooms = {rooms}/>
        <OrbitControls enableDamping maxPolarAngle={Math.PI/2} />
        <ambientLight intensity={0.1} />
        <ambientLight color={ 0xffffff } position={[0, 10, 5]} />
        {rooms
          .filter((room) => room.sim_id === id)
          .map((room) => {
            return <Room room = {room}/>
          })
        }
        {furniture
          .filter((f) => furnitureIds.includes(f.id))
          .map((f) => {
            return <Furniture f = {f}/>
          })
        }
        <PerspectiveCamera near={0.1} far={1000} position={[0, 0, 0]} lookAt={groupRef.current ? groupRef.current.position : [0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default SimVis;