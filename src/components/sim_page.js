import React, { Component } from "react";
import * as THREE from "three";
import { Link } from "react-router-dom";

var spin = false;
class sim_page extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff)
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      if (spin) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }
        renderer.render( scene, camera );
    };
    animate();
  }
  render() {
    function controlSpin() {
      spin = !spin
    }
    return (
      <div background-color="green">
        <h1>Spinning Cube / Simulation Page</h1>
        <li>
        <Link to="/home">Back to Home</Link>
        </li>
      <br />
        <label>Welcome to the workplace simulation!</label>
        <br></br>
        <button onClick={controlSpin}>Start/Stop Spin</button>
      </div>
    )
  }
}
  
export default sim_page;