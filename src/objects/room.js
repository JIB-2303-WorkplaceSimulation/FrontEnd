import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Room(props) {
  const room = props.room
  const x = Math.abs(room.Corner1_xcoord - room.Corner2_xcoord);
  const y = 0.05;
  const z = Math.abs(room.Corner1_zcoord - room.Corner2_zcoord);
  const a = (room.Corner2_xcoord + room.Corner1_xcoord) / 2;
  const b = (room.Corner2_zcoord + room.Corner1_zcoord) / 2;
  var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
  return (
    <mesh receiveShadow castShadow key={room.id*10} position={[a,0,b]}>
        <boxGeometry args={[x,y,z]} />
        <meshPhongMaterial color={new THREE.Color(0x426cf5)} />
    </mesh>
  );
}