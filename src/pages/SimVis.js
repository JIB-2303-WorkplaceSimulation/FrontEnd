import { useRef, useEffect, useParams, useState } from "react";
import * as THREE from "three";
import axios from 'axios';

const SimVis = () => {
    const canvasRef = useRef();
    var id = window.location.pathname.substring(8)
    const [rooms, setRooms] = useState([]);
    const [furniture, setFurniture] = useState([]);
    var furniture_ids = [];

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        axios.get("https://jsv2r3kn.directus.app/items/Room").then
    ((result) => {
        setRooms(result.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [], rooms);

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        axios.get("https://jsv2r3kn.directus.app/items/Furniture").then
    ((result) => {
        setFurniture(result.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [], furniture);

    rooms.filter(obj => obj.sim_id === id).forEach(
        (info)=>{
        function add(value) {
            furniture_ids.push(value)
        }
        info.room_furniture.forEach(add)
        }
    )

    useEffect(() => {

        console.log(rooms)
        // Sizes variables for ease of use
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        var scene = new THREE.Scene(); // Instantiates a scene

        //Creates a perspective camera 3 units away from origin
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 7
        camera.position.y = 7
        camera.lookAt(0,0,0)

        var renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current }) //Creates the renderer object
        var canvas = renderer.domElement // we make several calls to renderer.domElement so I call it canvas for ease of use
        renderer.setSize(sizes.width, sizes.height) // this sets the size of the render to the size of the browser window
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)) // Good for performance. Turn it to 0.1 and see what happens (it's p cool) :)
        document.body.appendChild( canvas ); //This is magic but it basically just makes it so that react can read the threejs that's happening here
        

        // rooms.forEach(room => {
        //     if (room.sim_id == id) {
        //         // Do something with the filtered room object
        //         var x = Math.abs(room.Corner1_xcoord - room.Corner2_xcoord)
        //         var y = 1
        //         var z = Math.abs(room.Corner1_zcoord - room.Corner2_zcoord)
        //         var a = (room.Corner2_xcoord - room.Corner1_xcoord)/2
        //         var b = (room.Corner2_zcoord - room.Corner1_zcoord)/2
        //         var geometry = new THREE.BoxGeometry(Math.abs(x,y,z))
        //         var material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        //         var mesh = new THREE.Mesh(geometry, material)
        //         mesh.position.set(a,0,b)
        //         scene.add(mesh)
        //     }
        // });
        // Creates a red box with all sides being 1 unit long. Creates a mesh out of the geometry and material and adds it to the scene
        // scene.add(new THREE.Mesh(
        //     new THREE.BoxGeometry(
        //         1,
        //         1,
        //         1
        //     ),
        //     new THREE.MeshBasicMaterial({ color: 0xff0000 })
        // ))
        // const geometry = new THREE.BoxGeometry(1, 1, 1)
        // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        // const mesh = new THREE.Mesh(geometry, material)
        // scene.add(mesh)

        renderer.render(scene, camera) //Renders the scene from the perspective of the camera
    
    }, []);

  // Returns the render
  return (
    <canvas ref={canvasRef} />
  );
}

export default SimVis;