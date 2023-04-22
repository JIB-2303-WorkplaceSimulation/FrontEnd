import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

export default function Worker(props) {
  // Create a reference to the cube object
  const cubeRef = useRef();
  const speed = [.5,.5]
  var frame = 0
  var frameLimit = props.simulationSpeed
  

  var prevXmove = 0;
  var prevYmove = 0;

  // Make workers clickable
  const [clicked, setClicked] = useState(false);
  
  function clickEvent() {
    setClicked(!clicked);
  }
  console.log(props.room)
  // Define the animation function
  useFrame((state, delta) => {
    frame += 1;
    frame = frame % frameLimit;
    if (frame !== 0) return;
    var possibleXMovement = [0];
    var possibleZMovement = [0];

     if (cubeRef.current.position.x + speed[0] < props.room.Corner2_xcoord){
         possibleXMovement.push(1);
     }
     if (cubeRef.current.position.x - speed[0] > props.room.Corner1_xcoord){
       possibleXMovement.push(-1);
     }
     if (cubeRef.current.position.z + speed[1] < props.room.Corner2_zcoord){
       possibleZMovement.push(1);
     }
     if (cubeRef.current.position.z - speed[1] > props.room.Corner1_zcoord){
       possibleZMovement.push(-1);
     }

    var nextXMove = [possibleXMovement[Math.floor(Math.random() * possibleXMovement.length)], prevXmove];
    nextXMove = nextXMove[Math.floor(Math.random() * nextXMove.length)]
    var nextYMove = [possibleZMovement[Math.floor(Math.random() * possibleZMovement.length)], prevYmove];
    nextYMove = nextYMove[Math.floor(Math.random() * nextYMove.length)]
    cubeRef.current.position.x += speed[0] * nextXMove
    cubeRef.current.position.z += speed[1] * nextYMove
    prevXmove = nextXMove
    prevYmove = nextYMove
  });

  // Create the cube object
  return (
    <mesh ref={cubeRef} position={props.initialPos} onClick={clickEvent}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color={clicked ? 'white': "hotpink"} />
    </mesh>
  );
}
