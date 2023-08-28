import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

let renderer, scene, camera, controls

init();
animate();

function init() {
	renderer = new THREE.WebGLRenderer ({
		antialias: true
	})
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.shadowMap.enabled = true;
	renderer.capabilities.logarithmicDepthBuffer = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.outputEncoding = THREE.sRGBEncoding
	// renderer.physicallyCorrectLights = true
	renderer.useLegacyLights = true
	renderer.toneMappingExposure = Math.pow(0.9, 0.4)
	renderer.toneMapping = THREE.ReinhardToneMapping
	document.body.appendChild(renderer.domElement)
	
	scene = new THREE.Scene()

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.05, 10000)
	camera.position.set(1.8, 2, 1)

	controls = new OrbitControls(camera, renderer.domElement)

	const sunlight = new THREE.PointLight(0xffffff, 10)
	sunlight.castShadow = true
	sunlight.shadow.bias = -0.005
	sunlight.decay = 2
	scene.add(sunlight)

	const sphereGeo = new THREE.SphereGeometry(0.25, 64, 64)
	const planetMat = new THREE.MeshPhongMaterial ({
		color: 0x0000FF,
		shininess: 0,
	})

	const planetMesh = new THREE.Mesh(sphereGeo, planetMat)
	planetMesh.castShadow = true
	planetMesh.receiveShadow = true

	const ringGeo = new THREE.RingGeometry(0.3, 0.5, 64)
	// https://firebasestorage.googleapis.com/v0/b/farpoint-js.appspot.com/o/saturn%2Fsaturn-ring.webp?alt=media&token=76117245-5be7-4c23-aee1-f33696f0d256
	const ringTex = new THREE.TextureLoader().load("https://firebasestorage.googleapis.com/v0/b/farpoint-js.appspot.com/o/saturn%2Fsaturn-ring.webp?alt=media&token=76117245-5be7-4c23-aee1-f33696f0d256")
	const ringMat = new THREE.MeshStandardMaterial({
		map: ringTex,
		side: THREE.DoubleSide,
		transparent: true,
	})

	const ringMesh = new THREE.Mesh(ringGeo, ringMat)
	ringMesh.castShadow = true
	ringMesh.receiveShadow = true

	const saturn = new THREE.Group()
	saturn.position.x = controls.target.x = 1.7
	saturn.position.y = Math.PI / 2
	saturn.position.z = Math.PI / 8
	saturn.add(planetMesh)
	saturn.add(ringMesh)
	scene.add(saturn)
}

function animate() {
	requestAnimationFrame(animate)

    // object.rotation.coordinate += amount

	renderer.render(scene, camera)
	controls.update()
}