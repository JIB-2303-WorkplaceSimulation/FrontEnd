import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Worker(props) {
  // Create a reference to the cube object
    const cubeRef = useRef();
    var frame = 0

  // Define the animation function
  useFrame((state, delta) => {
    frame += 1;
    frame = frame % 10;
    if (frame != 0){
        return;
    }
    var possibleXMovement = [0];
    var possibleZMovement = [0];

    if (cubeRef.current.position.x + props.speed[0] < props.maxX){
        possibleXMovement.push(1);
    }
    if (cubeRef.current.position.x - props.speed[0] > props.minX){
      possibleXMovement.push(-1);
    }
    if (cubeRef.current.position.z + props.speed[1] < props.maxZ){
      possibleZMovement.push(1);
    }
    if (cubeRef.current.position.z - props.speed[1] > props.minZ){
      possibleZMovement.push(-1);
    }

    cubeRef.current.position.x += props.speed[0] * possibleXMovement[Math.floor(Math.random() * possibleXMovement.length)];
    cubeRef.current.position.z += props.speed[1] * possibleZMovement[Math.floor(Math.random() * possibleZMovement.length)];
  });

  // Create the cube object
  return (
    <mesh ref={cubeRef} position ={props.initialPos}>
      <boxBufferGeometry args={[1,1,1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
