//  VR SETUP
import * as THREE from 'three';

import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
import { VRButton } from './libs/VRButton';

let camera, scene, renderer;

let room

init();
setupVR();
animate();

function init() {

    //Il bottone custom si trova nella cartella libs, perche modificando il file nella libreria originale threejs, 
    //non apportava comunque i cambiamenti (p.s. attenzione, il file originale VRButton di threejs in questo repo, è stato modificato per test!!)
    
    //Per usarlo basta creare una cartella libs nella root del proprio progetto, incollare li il file VRButton.js che si trova nella cartella libs in questo repo
    //ed utilizzare l'import :  import {VRButton} from "./libs/VRButton"

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x505050 );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( 0, 1.6, 3 );

    let radius = 0.08

    room = new THREE.LineSegments(
        new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
        new THREE.LineBasicMaterial( { color: 0xbcbcbc } )
    );
    room.geometry.translate( 0, 3, 0)
    scene.add( room );

    let geometry = new THREE.IcosahedronGeometry(radius, 2)

    for(let i=0; i<200; i++){
        let obj = new THREE.Mesh(geometry,
            new THREE.MeshLambertMaterial({
                color: Math.random() * 0xFFFFFF
            }))
        obj.position.x = random(-2 , 2)
        obj.position.y = random(-2 , 2)
        obj.position.z = random(-2 , 2)

        room.add(obj)
    }

    scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
    

    
    window.addEventListener( 'resize', onWindowResize, false );

}

function setupVR(){
    renderer.xr.enabled = true
    document.body.appendChild( VRButton.createButton(renderer) );
}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function random( min, max ){
    return Math.random() * (max-min) + min;
}

//Render (Animation Loop)

function animate() {

    renderer.setAnimationLoop( render );

}

function render() {

    renderer.render( scene, camera );

}
