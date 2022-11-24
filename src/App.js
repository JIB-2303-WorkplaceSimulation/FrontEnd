import React, { Component, useState } from "react";
import * as THREE from "three";

var spin = false;
class App extends Component {
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
        <label>Welcome to the workplace simulation!</label>
        <br></br>
        <button onClick={controlSpin}>Start/Stop Spin</button>
      </div>
    )
  }
}
export default App