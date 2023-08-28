import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000)
camera.position.set(0, 0, 10)
camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(innerWidth, innerHeight)
renderer.setClearColor(0x0404040)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16)
const material = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(geometry, material)
scene.add(torusKnot)

const pts = new Array(20).fill(0).map(p => {
	return new THREE.Vector3().random().subScalar(0.5).multiplyScalar(10)
})
const g = new THREE.BufferGeometry().setFromPoints(pts)
const tex = createRadial()
const m = new THREE.PointsMaterial({
	map: tex,
	alphaTest: 0.1,
	transparent: true,
	blending: THREE.AdditiveBlending,
})
const p = new THREE.Points(g, m)
scene.add(p)

window.addEventListener("resize", onResize)

renderer.setAnimationLoop(_ => {
	renderer.render(scene, camera);
})

function onResize(event) {
	camera.aspect = innerWidth / innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(innerWidth, innerHeight)
}

function createRadial() {
	let c = document.createElement("canvas")
	c.width = c.height = 256
	let ctx = c.getContext("2d")
	let x = 127
	let y = 127
	let radius = 127
	let grd = ctx.createRadialGradient(x, y, 1, x, y, radius)
	grd.addColorStop(0, "white")
	grd.addColorStop(1, "transparent")
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 256, 256)
	return new THREE.CanvasTexture(c)
}
