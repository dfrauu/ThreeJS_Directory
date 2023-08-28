import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

let renderer, sceneA, sceneB, sceneC, camera, controls, alpha, boxMesh, curve, startTime;

init()
animate()

function init() {
    // renderer
    renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    renderer.autoClear = false;
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    console.log(renderer)
    // scene
    sceneA = new THREE.Scene()
    sceneB = new THREE.Scene()
    sceneC = new THREE.Scene()
    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 40);

    // controls
    controls = new OrbitControls(camera, renderer.domElement)
    const materialA = new THREE.MeshStandardMaterial({ color:0xff0000 })
    const materialB = new THREE.MeshStandardMaterial({ color:0x00ff00, flatShading: true })
    const materialC = new THREE.MeshStandardMaterial({ color:0x00ff00, transparent: true, opacity: 0.5, flatShading: true })
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(5,30,30),materialA)

    const box = new THREE.Mesh(new THREE.BoxGeometry(12,12,12),materialB)
    sceneB.add(box)

    const boxC = new THREE.Mesh(new THREE.BoxGeometry(12,12,12),materialC)
    sceneC.add(boxC);

    const lightA = new THREE.DirectionalLight( 0xffffff, 1, 100 )
    const lightB = new THREE.DirectionalLight( 0xffffff, 1, 100 )
    const lightC = new THREE.DirectionalLight( 0xffffff, 1, 100 )
    lightA.position.set(10,5,2);
    lightB.position.set(10,5,2);
    lightC.position.set(10,5,2);
    sceneA.add(sphere,lightA);
    sceneB.add(box,lightB);
    sceneC.add(boxC,lightC);

}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( sceneB, camera );
    renderer.clearDepth();
    renderer.render( sceneA, camera );
    renderer.clearDepth();
    renderer.render( sceneC, camera );

}