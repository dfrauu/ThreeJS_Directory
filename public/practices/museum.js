import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

// CYLINDER 1
const geometry = new THREE.CylinderGeometry( 2, 2, 2, 48 );
const material = new THREE.MeshBasicMaterial({
    color: 0x7b83eb,
    wireframe: false,
})
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );

// CUBE
const geometry2 = new THREE.BoxGeometry(5,5,5)
const material2 = new THREE.MeshBasicMaterial({
    color: 0xffe793,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry2, material2)
// cube.position.x = -2.5
cube.position.y = 5
scene.add(cube)

// CYLINDER 2
const geometry1 = new THREE.CylinderGeometry( 3, 3, 0.3, 48 );
const material1 = new THREE.MeshBasicMaterial({
    color: 0xffc92c,
    wireframe: false,
})
const cylinder1 = new THREE.Mesh( geometry1, material1 );
cylinder1.position.x = -10
cylinder1.position.y = 5
scene.add( cylinder1 );

// CUBE 2
const geometry3 = new THREE.BoxGeometry(2,3,2)
const material3 = new THREE.MeshBasicMaterial({
    color: 0x7b83eb,
    wireframe: false,
})
const cube1 = new THREE.Mesh(geometry3, material3)
cube1.position.x = -10
scene.add(cube1)


// LAMBERT LIGHTING


window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const coinFolder = gui.addFolder('Coin')
coinFolder.add(cylinder1.scale, 'y', 0.000001, 10)
coinFolder.open()
const prismFolder = gui.addFolder('Prism')
prismFolder.add(cube.rotation, 'x', -5, 5)
prismFolder.open()
// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'z', 0, 10)
// cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.025
    cube.rotation.y += 0.025
    cube.rotation.z += 0.025

    cylinder1.rotation.x += 0.0125
    cylinder1.rotation.y += 0.0125
    cylinder1.rotation.z += 0.0125
    // cylinder1.rotation.x += 2
    // cylinder1.rotation.y += 2
    // cylinder1.rotation.z += 2
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()

