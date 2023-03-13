import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
//import { Vector3, Group } from 'three';
import * as THREE from 'three';
import axios from 'axios';

function SimVis() {
  const groupRef = useRef();
  //const canvasRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [furnitureIds, setFurnitureIds] = useState([]);
  const id = parseInt(window.location.pathname.substring(8));


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
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <OrbitControls enableDamping maxPolarAngle={Math.PI/2} />
        <ambientLight intensity={0.1} />
        <ambientLight color={ 0xffffff } position={[0, 10, 5]} />
        <group position={[0,-5,-8]} ref={groupRef}>
          {rooms
            .filter((room) => room.sim_id === id)
            .map((room) => {
              const x = Math.abs(room.Corner1_xcoord - room.Corner2_xcoord);
              const y = 0.05;
              const z = Math.abs(room.Corner1_zcoord - room.Corner2_zcoord);
              const a = (room.Corner2_xcoord + room.Corner1_xcoord) / 2;
              const b = (room.Corner2_zcoord + room.Corner1_zcoord) / 2;
              var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
              return (
                <mesh receiveShadow castShadow key={room.id*10} position={[a,0,b]}>
                  <boxGeometry args={[x,y,z]} />
                  <meshPhongMaterial color={new THREE.Color(0x800080)} />
                </mesh>
              );
            })
          }
          {furniture
            .filter((f) => furnitureIds.includes(f.id))
            .map((f) => {
              const x = f.x_coord;
              const z = f.z_coord;
              var rotation = Math.PI/2;
              if (f.face_direction === "North") {
                rotation *= 0;
              } else if (f.face_direction === "West") {
                rotation *= 1;
              } else if (f.face_direction === "South") {
                rotation *= 2;
              } else if (f.face_direction === "East") {
                rotation *= 3;
              } 
              var color = 0x0;
              var element = [];
              if (f.type === "Chair") {
                color = 0xF28C28;
                element.push(
                  <group key={f.id*10} position={[x,0,z]} rotation={[0, rotation, 0]}>
                    <mesh receiveShadow castShadow key={f.id*10} position={[0,1,0]}>
                      <boxGeometry args={[1,0.1,1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+1} position={[0.4,0.5,-0.4]}>
                      <boxGeometry args={[0.1,1,0.1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+2} position={[-0.4,0.5,-0.4]}>
                      <boxGeometry args={[0.1,1,0.1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+3} position={[0.4,0.5,0.4]}>
                      <boxGeometry args={[0.1,1,0.1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+4} position={[-0.4,0.5,0.4]}>
                      <boxGeometry args={[0.1,1,0.1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+5} position={[-0.4,1.75,0]}>
                      <boxGeometry args={[0.1,1.5,1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                  </group>
                )
              } else if (f.type === "Table") {
                color = 0x468468;
                var x_len = f.x_length;
                var z_len = f.z_length;
                element.push(
                  <group key={f.id*10} position={[x,0,z]} rotation={[0, rotation, 0]}>
                  <mesh receiveShadow castShadow key={f.id*10} position={[0,1.75,0]}>
                      <boxGeometry args={[x_len,0.1,z_len]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+1} position={[x_len/2-0.1,0.875,z_len/2-0.1]}>
                      <boxGeometry args={[0.1,1.75,0.1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+2} position={[-x_len/2+0.1,0.875,z_len/2-0.1]}>
                      <boxGeometry args={[0.1,1.75,0.1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+3} position={[x_len/2-0.1,0.875,-z_len/2+0.1]}>
                      <boxGeometry args={[0.1,1.75,0.1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                    <mesh receiveShadow castShadow key={f.id*10+4} position={[-x_len/2+0.1,0.875,-z_len/2+0.1]}>
                      <boxGeometry args={[0.1,1.75,0.1]} />
                      <meshPhongMaterial color={new THREE.Color(color)} />
                    </mesh>
                  </group>
                )
              }
              return element;
            })
          }
        </group>
        
        <PerspectiveCamera near={0.1} far={1000} position={[0, 0, 0]}  />
      </Canvas>
    </div>
  );
};

export default SimVis;