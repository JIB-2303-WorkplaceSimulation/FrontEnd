import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

export default function Worker(props) {
  // Create a reference to the cube object
  const cubeRef = useRef();
  var frame = 0
  var frameLimit = props.simulationSpeed
  var rooms = props.rooms.map(room => ({
    minX: Math.min(room.Corner1_xcoord, room.Corner2_xcoord),
    minZ: Math.min(room.Corner1_zcoord, room.Corner2_zcoord),
    maxX: Math.max(room.Corner1_xcoord, room.Corner2_xcoord),
    maxZ: Math.max(room.Corner1_zcoord, room.Corner2_zcoord),
}));

  // Define the animation function
  useFrame((state, delta) => {
    frame += 1;
    frame = frame % frameLimit;
    if (frame !== 0){
        return;
    }
    var possibleXMovement = [0];
    var possibleZMovement = [0];
    // var moving = false
    const attemptX = cubeRef.current.position.x + props.speed[0] * possibleXMovement[Math.floor(Math.random() * possibleXMovement.length)]
    const attemptZ = cubeRef.current.position.z + props.speed[1] * possibleXMovement[Math.floor(Math.random() * possibleXMovement.length)]
    for (const room in rooms) {
      if (
        attemptX >= room.minX &&
        attemptX <= room.maxX &&
        attemptZ >= room.minZ &&
        attemptZ <= room.maxZ
      ) {
        cubeRef.current.position.x = attemptX
        cubeRef.current.position.x = attemptZ
      }
    }

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
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
