import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import { Vector3, Group } from 'three';
import * as THREE from 'three';
import axios from 'axios';

function SimVis() {
  const groupRef = useRef();
  const canvasRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [furnitureIds, setFurnitureIds] = useState([]);
  const id = window.location.pathname.substring(8);


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
    rooms.filter((obj) => obj.sim_id == id).forEach((info) => {
      info.room_furniture.forEach((furnitureId) => {
        newFurnitureIds.push(furnitureId);
      });
    });
    setFurnitureIds(newFurnitureIds);
  }, [rooms]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <OrbitControls enableDamping maxPolarAngle={Math.PI/2} />
        <ambientLight intensity={0.1} />
        <ambientLight color="red" position={[0, 0, 5]} />
        <group ref={groupRef}>
          {rooms
            .filter((room) => room.sim_id == id)
            .map((room) => {
              const x = Math.abs(room.Corner1_xcoord - room.Corner2_xcoord);
              const y = 0.05;
              const z = Math.abs(room.Corner1_zcoord - room.Corner2_zcoord);
              const a = (room.Corner2_xcoord + room.Corner1_xcoord) / 2;
              const b = (room.Corner2_zcoord + room.Corner1_zcoord) / 2;
              return (
                <mesh receiveShadow castShadow key={room.id} position={[a,0,b]}>
                  <boxGeometry args={[x,y,z]} />
                  <meshPhongMaterial color={new THREE.Color('#dbdbdb')} />
                </mesh>
              );
            })
          }
          {furniture
            .filter((f) => furnitureIds.includes(f.id))
            .map((f) => {
              const x = f.x_coord;
              const z = f.z_coord;
              return (
                <mesh receiveShadow castShadow key={f.id} position={[x,0.5,z]}>
                  <boxGeometry args={[1,1,1]} />
                  <meshPhongMaterial color={new THREE.Color('#bfbfbf')} />
                </mesh>
              )
            })
          }
        </group>
        <PerspectiveCamera near={0.1} far={1000} position={[0, 0, 5]} lookAt={groupRef.current ? groupRef.current.position : [0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default SimVis;