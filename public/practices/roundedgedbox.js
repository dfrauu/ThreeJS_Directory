import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 5, 5, 30 );
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( -10, 10, 10 );
scene.add( dirLight );

const loader = new THREE.CubeTextureLoader();
loader.setCrossOrigin( "" );
loader.setPath( 'https://threejs.org/examples/textures/cube/pisa/' );

const cubeTexture = loader.load( [
  'px.png', 'nx.png',
  'py.png', 'ny.png',
  'pz.png', 'nz.png'
] );

scene.background = cubeTexture;

function createBoxWithRoundedEdges( width, height, depth, radius0, smoothness ) {
  let shape = new THREE.Shape();
  let eps = 0.00001;
  let radius = radius0 - eps;
  shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true );
  shape.absarc( eps, height -  radius * 2, eps, Math.PI, Math.PI / 2, true );
  shape.absarc( width - radius * 2, height -  radius * 2, eps, Math.PI / 2, 0, true );
  shape.absarc( width - radius * 2, eps, eps, 0, -Math.PI / 2, true );
  let geometry = new THREE.ExtrudeGeometry( shape, {
    amount: depth - radius0 * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius0,
    curveSegments: smoothness
  });
  
  geometry.center();
  return geometry;
}

for ( let i = 0; i < 10; i++ ){
 
  let cubeMat = new THREE.MeshStandardMaterial( {
    color: Math.random() * 0x777777 + 0x777777,
    envMap: cubeTexture,
    metalness: i / 9,
    roughness: 1 - i / 9,
  } );
  let cube = new THREE.Mesh( createBoxWithRoundedEdges( 2, 2, 2, i / 9, 16 ), cubeMat );
  cube.scale.setScalar( 1.25 );
  cube.position.x = ( -4.5 + i ) * 3;
  scene.add( cube );
}

render();

function render() {
  requestAnimationFrame(render);
  renderer.render( scene, camera );
}