import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
// standard global letiables
let container, scene, camera, renderer, controls;
let clock = new THREE.Clock();
// custom global letiables
let cube;
 
init();
animate();
 
// FUNCTIONS        
function init() 
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);  
 
    // TEXTURA
    const textura01 = new THREE.TextureLoader().load('textures/azul.jpg' );
 
    const textura02 = new THREE.TextureLoader().load('textures/dorado.jpg', function(textura02){
        textura02.wrapS = textura02.wrapT = THREE.RepeatWrapping;
        textura02.offset.set( 0, 0 );
        textura02.repeat.set(10, 5 );
    })
 
    // RENDERER
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );
    // CONTROLS
    controls = new OrbitControls( camera, renderer.domElement );
 
    // cube 
    let cubeGeometry = new THREE.BoxGeometry( 50, 50, 50 );
    let cubeMaterial02 = new THREE.MeshLambertMaterial({color: 0x888888, map: textura01, side: THREE.DoubleSide});
    // let cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x888888 } );
    cube = new THREE.Mesh( cubeGeometry, cubeMaterial02 );
    cube.position.set(0,50,0);
    scene.add(cube);
 
    const geometry3 = new THREE.IcosahedronGeometry(25, 0);
    let Material03 = new THREE.MeshPhongMaterial({color: 0x76EA00, map: textura01, side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(geometry3, Material03);
    mesh.position.set(100,20,0);
    scene.add(mesh);
    
    // PLANE
    /* let floorMaterial = new THREE.MeshPhongMaterial({color: 0xFF4589, side: THREE.DoubleSide})
    let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);*/
 
    let planeMaterial = new THREE.MeshBasicMaterial({ map: textura02, side: THREE.DoubleSide});
    let planeGeometry = new THREE.PlaneGeometry(1000,1000,100);
    let pisoTotal = new THREE.Mesh(planeGeometry, planeMaterial);
    pisoTotal.position.y = -0.5;
    pisoTotal.rotation.x = Math.PI/ 2;
    scene.add(pisoTotal);
 
    // LIGHT
    /*let light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);
    
    let light2 = new THREE.PointLight(0x0000ff);
    light2.position.set(0,-250,0);
    scene.add(light2);*/
 
    const directionalLight = new THREE.DirectionalLight( 0xffffff,1);
    scene.add( directionalLight );
}
 
function animate() 
{
    requestAnimationFrame( animate );
    render();       
    update();
}
 
function update()
{
    controls.update();
}
 
function render() 
{
    renderer.render( scene, camera );
}