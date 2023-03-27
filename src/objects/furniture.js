import React from "react";
// import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Furniture(props) {
  const f = props.f
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
  if (f.type === "Chair") {
    color = 0xF28C28;
    return (
      <group key={f.id*10} position={[x,0,z]} rotation={[0, rotation, 0]}>
        <mesh receiveShadow castShadow key={f.id*10+1} position={[0,1,0]}>
          <boxGeometry args={[1,0.1,1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+2} position={[0.4,0.5,-0.4]}>
          <boxGeometry args={[0.1,1,0.1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+3} position={[-0.4,0.5,-0.4]}>
          <boxGeometry args={[0.1,1,0.1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+4} position={[0.4,0.5,0.4]}>
          <boxGeometry args={[0.1,1,0.1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+5} position={[-0.4,0.5,0.4]}>
          <boxGeometry args={[0.1,1,0.1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+6} position={[-0.4,1.75,0]}>
          <boxGeometry args={[0.1,1.5,1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
      </group>
    )
  } else if (f.type === "Table") {
    color = 0x468468;
    var x_len = f.x_length;
    var z_len = f.z_length;
    return (
      <group key={f.id*10} position={[x,0,z]} rotation={[0, rotation, 0]}>
      <mesh receiveShadow castShadow key={f.id*10+1} position={[0,1.75,0]}>
          <boxGeometry args={[x_len,0.1,z_len]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+2} position={[x_len/2-0.1,0.875,z_len/2-0.1]}>
          <boxGeometry args={[0.1,1.75,0.1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+3} position={[-x_len/2+0.1,0.875,z_len/2-0.1]}>
          <boxGeometry args={[0.1,1.75,0.1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+4} position={[x_len/2-0.1,0.875,-z_len/2+0.1]}>
          <boxGeometry args={[0.1,1.75,0.1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
        <mesh receiveShadow castShadow key={f.id*10+5} position={[-x_len/2+0.1,0.875,-z_len/2+0.1]}>
          <boxGeometry args={[0.1,1.75,0.1]} />
          <meshPhongMaterial color={new THREE.Color(color)} />
        </mesh>
      </group>
    )
  }
}