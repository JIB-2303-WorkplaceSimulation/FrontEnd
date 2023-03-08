import { useRef, useEffect } from "react";
import * as THREE from "three";

const SimVis = () => {
    const canvasRef = useRef();
    useEffect(() => {

        // Sizes variables for ease of use
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        var scene = new THREE.Scene(); // Instantiates a scene

        //Creates a perspective camera 3 units away from origin
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 3

        var renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current }) //Creates the renderer object
        var canvas = renderer.domElement // we make several calls to renderer.domElement so I call it canvas for ease of use
        renderer.setSize(sizes.width, sizes.height) // this sets the size of the render to the size of the browser window
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)) // Good for performance. Turn it to 0.1 and see what happens (it's p cool) :)
        document.body.appendChild( canvas ); //This is magic but it basically just makes it so that react can read the threejs that's happening here
        
        // Creates a red box with all sides being 1 unit long. Creates a mesh out of the geometry and material and adds it to the scene
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        renderer.render(scene, camera) //Renders the scene from the perspective of the camera
    
    }, []);

  // Returns the render
  return (
    <canvas ref={canvasRef} />
  );
}

export default SimVis;