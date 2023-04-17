// import { events } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import SimVis from "../pages/SimVis.js";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

export default function Furniture(props) {
  const f = props.f
  const x = f.x_coord;
  const z = f.z_coord;
  const room = props.room[0];
  const x_length = f.type === "Table" ? f.x_length : 1
  const z_length = f.type === "Table" ? f.z_length : 1
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
  const [position, setPosition] = useState([x,0,z]);
  const [clicked, setClicked] = useState(false);
  const [unclicked, setUnclicked] = useState(true);
  
  function clickEvent() {
    setClicked(!clicked);
    setUnclicked(clicked);
    if (props.onRemove) {
      props.onRemove(f, !clicked);
    }
  }

  function updateData() {
      props.onUnclicked(f)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!clicked) return;
      if (e.code === "ArrowUp") {
        if (z-0.1-z_length/2 < room.Corner1_zcoord && z-0.1-z_length/2 < room.Corner2_zcoord) return;
        setPosition((prevPos) => [prevPos[0], prevPos[1], prevPos[2] - 0.1]);
        props.f.x_coord = position[0];
        props.f.y_coord = position[1];
        props.f.z_coord = position[2] - 0.1;
      } else if (e.code === "ArrowDown") {
        if (z+0.1+z_length/2 > room.Corner1_zcoord && z+0.1+z_length/2 > room.Corner2_zcoord) return;
        setPosition((prevPos) => [prevPos[0], prevPos[1], prevPos[2] + 0.1]);
        props.f.x_coord = position[0];
        props.f.y_coord = position[1];
        props.f.z_coord = position[2] + 0.1;
      } else if (e.code === "ArrowLeft") {
        if (x-0.1-x_length/2 < room.Corner1_xcoord && x-0.1-x_length/2 < room.Corner2_xcoord) return;
        setPosition((prevPos) => [prevPos[0] - 0.1, prevPos[1], prevPos[2]]);
        props.f.x_coord = position[0] - 0.1;
        props.f.y_coord = position[1];
        props.f.z_coord = position[2];
      } else if (e.code === "ArrowRight") {
        if (x+0.1+x_length/2 > room.Corner1_xcoord && x+0.1+x_length/2 > room.Corner2_xcoord) return;
        setPosition((prevPos) => [prevPos[0] + 0.1, prevPos[1], prevPos[2]]);
        props.f.x_coord = position[0] + 0.1;
        props.f.y_coord = position[1];
        props.f.z_coord = position[2];
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clicked, position, props.f, unclicked, x, z, room, x_length, z_length]);
  if (f.type === "Chair") {
    color = 0xF28C28;
    
    return (
      <group key={f.id*10} position={position} rotation={[0, rotation, 0]} onClick={clickEvent} onUpdate={updateData}>
        <mesh receiveShadow castShadow key={f.id*10+1} position={[0,1,0]}>
          <boxGeometry args={[1,0.1,1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+2} position={[0.4,0.5,-0.4]}>
          <boxGeometry args={[0.1,1,0.1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+3} position={[-0.4,0.5,-0.4]}>
          <boxGeometry args={[0.1,1,0.1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+4} position={[0.4,0.5,0.4]}>
          <boxGeometry args={[0.1,1,0.1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+5} position={[-0.4,0.5,0.4]}>
          <boxGeometry args={[0.1,1,0.1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+6} position={[-0.4,1.75,0]}>
          <boxGeometry args={[0.1,1.5,1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
      </group>
    )
  } else if (f.type === "Table") {
    color = 0x468468;
    var x_len = f.x_length;
    var z_len = f.z_length;
    return (
      <group key={f.id*10} position={position} rotation={[0, rotation, 0]} onClick={clickEvent}>
      <mesh receiveShadow castShadow key={f.id*10+1} position={[0,1.75,0]}>
          <boxGeometry args={[x_len,0.1,z_len]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+2} position={[x_len/2-0.1,0.875,z_len/2-0.1]}>
          <boxGeometry args={[0.1,1.75,0.1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+3} position={[-x_len/2+0.1,0.875,z_len/2-0.1]}>
          <boxGeometry args={[0.1,1.75,0.1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+4} position={[x_len/2-0.1,0.875,-z_len/2+0.1]}>
          <boxGeometry args={[0.1,1.75,0.1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+5} position={[-x_len/2+0.1,0.875,-z_len/2+0.1]}>
          <boxGeometry args={[0.1,1.75,0.1]} />
          <meshPhongMaterial color={clicked ? 'white': color} />
        </mesh>
      </group>
    )
  }
  return <div>SimVis myVar={position}</div>
}