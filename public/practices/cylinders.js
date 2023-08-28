import * as THREE from 'three'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import {GUI} from './jsm/libs/lil-gui.module.min.js'
 
// se crea la escena
const scene = new THREE.Scene()
 
// se crea la camara
const camera =  new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)
camera.position.z = 5
 
// creando y seteando el renderizador de escena
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)
 
// creando los controles
const controls = new OrbitControls(camera, renderer.domElement)
 
// luces  
const light = new THREE.PointLight( 0xeeeeee ); // soft white light
light.position.z = 10
scene.add( light );
 
// aqui ya empezamos la creacion de nuestra escena
const geometria1 = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const cilindro1 = new THREE.Mesh(geometria1, material1)
scene.add(cilindro1)
 
const geometria2 = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material2 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide
})
const cilindro2 = new THREE.Mesh(geometria2, material2)
cilindro2.position.x = -15
scene.add(cilindro2)
 
const geometria3 = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material3 = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide
})
const cilindro3 = new THREE.Mesh(geometria3, material3)
cilindro1.position.x = 15
scene.add(cilindro3)
 
// se crea el evento que detecta cambios en el navegador
// ajuste de ventana o giros con el mouse
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
 
// esto es para visualizar el consumo de recurso de la pagina
// web al usar tu graficos
const stats = Stats()
document.body.appendChild(stats.dom)
 
// crearemos un ui para el usuario
const gui = new GUI()
const cubeFolder = gui.addFolder('cubo1')
cubeFolder.add(cilindro1.scale, 'x',-5,5)
cubeFolder.add(cilindro1.scale, 'y',-5,5)
cubeFolder.add(cilindro1.scale, 'z',-5,5)
cubeFolder.open()
const cameraFolder = gui.addFolder('camera')
cameraFolder.add(camera.position, 'z',0,15)
cameraFolder.open()
 
// crear la animacion
function animate(){
    requestAnimationFrame(animate)
    // cilindro1.rotation.x += 0.01
    // cilindro1.rotation.y += 0.01
    controls.update()
    render()
    stats.update()
}
 
// creando el render
function render(){
    renderer.render(scene, camera)
}
 
animate()