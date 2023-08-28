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
	// RENDERER
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	// CONTROLS
	controls = new OrbitControls( camera, renderer.domElement );

	// TEXTURES
	const texture1 = new THREE.TextureLoader().load('textures/gravel.jpg')
	const texture2 = new THREE.TextureLoader().load('textures/cobble1.jpg', function(texture2) {
		texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
		texture2.offset.set( 0, 0 );
		texture2.repeat.set( 4, 4 );
	})

	// CUBE
	let cubeGeometry = new THREE.BoxGeometry( 50, 50, 50 );
	// let cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x888888 } );
	let cubeMaterial = new THREE.MeshLambertMaterial( { map: texture1 } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(-35,50,0);
	scene.add(cube);

	// TRANSLUCENT CUBE
	let cubeGeometry1 = new THREE.BoxGeometry( 50, 50, 50 );
	let cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0x888888, transparent: true, opacity: 0.5 } );
	let cube1 = new THREE.Mesh( cubeGeometry1, cubeMaterial1 );
	cube1.position.set(0,50,-75);
	scene.add(cube1);

	// ICOSAHEDRON
	let icoGeometry = new THREE.IcosahedronGeometry( 25, 0 );
	// let icoMaterial = new THREE.MeshLambertMaterial( { color: 0x888888 } );
	let icoMaterial1 = new THREE.MeshLambertMaterial( { map: texture1 } );
	let ico = new THREE.Mesh( icoGeometry, icoMaterial1 );
	ico.position.set(35,50,0);
	scene.add(ico);

	// FOG
	const skyBoxGeometry = new THREE.SphereGeometry(1000,1000,1000)
	const skyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x9999ff, side:THREE.BackSide})
	const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial)
	// scene.add(skyBox)
	// scene.fog = new THREE.FogExp2(0x990099, 0.0015)

    // LIGHT
	let light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	
	// NEW FLOOR
	// let FloorMaterial1 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide, color: 0x00ffff  });
	let FloorMaterial2 = new THREE.MeshBasicMaterial({ map: texture2, side: THREE.DoubleSide });
	let FloorGeometry1 = new THREE.PlaneGeometry(1000, 1000, 100, 100);
	let floor1 = new THREE.Mesh(FloorGeometry1, FloorMaterial2);
	floor1.position.y = -1;
	floor1.rotation.x = Math.PI / 2;
	scene.add(floor1);


	// ORIGINAL BASE
    let floorMaterial = new THREE.MeshLambertMaterial({color: 0xFF4589, side: THREE.DoubleSide})
    let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
	let floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	// scene.add(floor);

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
