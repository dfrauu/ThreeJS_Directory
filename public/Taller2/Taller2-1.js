/* 
* 
* Computacion Grafica y Visual
* Taller 2
* Parte 1: Escena con un objeto, luces y sombras
* 
* Por:
* Diego Frauca
* 8-975-1382
* 1SF-141
* 
*/

import * as THREE from 'three'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import Stats from '../jsm/libs/stats.module.js'
import { GUI } from '../jsm/libs/lil-gui.module.min.js'

// Varianbes globales estandar
let container, scene, camera, renderer, controls, stats;
// Variables globales personalizadas
let ico, cube;

init();
animate();

// Funciones		
function init() {
	// Escena
	scene = new THREE.Scene();
	// Camara
	let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,350,1000);
	camera.lookAt(scene.position);	
	// Renderer
	renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	// Controles
	controls = new OrbitControls( camera, renderer.domElement );

    // Modulo Resize
    window.addEventListener(
        'resize',
        () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            // render()
        },
        false
    )

    // Objeto central: Icosahedro
	const icoGeometry = new THREE.IcosahedronGeometry( 50, 0 );
	const icoMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
	ico = new THREE.Mesh( icoGeometry, icoMaterial );
    ico.castShadow = true;
    ico.receiveShadow = false;
	ico.position.set(0,100,0);
	scene.add(ico);

	// Plano de suelo para recibir sombras
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x111111, side: THREE.DoubleSide });
	const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.receiveShadow = true;
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

    // Variables para las luces
    let vertical = 300;
    let intensity = 6;

    // SPOTLIGHTS
    // Luz blanca central
    const light = new THREE.SpotLight( 0xffffff );
    light.position.set( 0, 1000, 0 );
    light.castShadow = true;
    scene.add( light );

    // Cyan
    const light1 = new THREE.SpotLight( 0x00ffff, intensity );
    light1.position.set( 100, vertical, 100 );
    light1.castShadow = true;
    scene.add( light1 );

    // Magenta
    const light2 = new THREE.SpotLight( 0xff00ff, intensity );
    light2.position.set( -100, vertical, 100 );
    light2.castShadow = true;
    scene.add( light2 );

    // Yellow
    const light3 = new THREE.SpotLight( 0xffff00, intensity );
    light3.position.set( 0, vertical, -100*Math.sqrt(3)/2  );
    light3.castShadow = true;
    scene.add( light3 );   

    stats = Stats();
    document.body.appendChild(stats.dom);

    // Controles de intensidad de las luces
    const gui = new GUI();
    const folder = gui.addFolder('Intensidad de las Spotlights');
    folder.add(light1, 'intensity', 1, 12, 0.01).name('light1: Cyan');
    folder.add(light2, 'intensity', 1, 12, 0.01).name('light2: Magenta');
    folder.add(light3, 'intensity', 1, 12, 0.01).name('light3: Yellow');
    folder.open();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Rotacion del icosahedro
    ico.rotation.x += 0.015;
    ico.rotation.y += 0.015;
    ico.rotation.z += 0.015;

    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}
