import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'

let camera, scene, renderer, controls;
let earth, earth_container, lookAtPos;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(25, 1, 0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    let light = new THREE.PointLight(0xffffff);
    scene.add(light);
    let ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    let gridGeom = new THREE.PlaneGeometry(22, 22, 22, 22);
    gridGeom.rotateX(THREE.MathUtils.degToRad(-90));
    let gridMat = new THREE.MeshBasicMaterial({ color:0x555555, wireframe:true })
    let grid = new THREE.Mesh(gridGeom, gridMat);
    scene.add(grid);

    let sunGeom = new THREE.SphereGeometry(2,16,8);
    let sunMat = new THREE.MeshBasicMaterial({ color:"gold" })
    earth = new THREE.Mesh(sunGeom, sunMat);
    scene.add(earth);

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0))
    points.push(new THREE.Vector3(0, 10, 0))
    points.push(new THREE.Vector3(10, 0, 0))

    let earthGeom = new THREE.SphereGeometry(1,16,8);
    let earthMat = new THREE.MeshLambertMaterial({ color:"white", transparent: true, opacity: 0.95 })
    earth = new THREE.Mesh(earthGeom, earthMat);

    let edges = new THREE.EdgesGeometry(earthGeom);
    let lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color:"purple" }));
    earth.add(lines);

    const axisGeomPoints = [];
    axisGeomPoints.push(new THREE.Vector3(0,1.5,0));
    axisGeomPoints.push(new THREE.Vector3(0,-1.5,0));
    let axisGeom = new THREE.BufferGeometry().setFromPoints(axisGeomPoints)
    let axis = new THREE.Line(axisGeom, new THREE.LineBasicMaterial({ color:"yellow" }));
    earth.add(axis);

    scene.add(earth);

    let earth_holder = new THREE.Group()
    earth_holder.rotation.x = THREE.MathUtils.degToRad(-23);
    earth_holder.add(earth);

    earth_container = new THREE.Group();
    earth_container.add(earth_holder);
    scene.add(earth_container);

}

function animate() {
    let time = new Date() * 0.00025;
    requestAnimationFrame(animate);
    earth.rotation.y += 0.025;
    earth_container.position.x = -Math.cos(time) * 10;
    earth_container.position.z = -Math.sin(time) * 10;
    lookAtPos = earth_container.position.clone().add(new THREE.Vector3(0,0,1));
    earth_container.lookAt(lookAtPos);

    render();
}

function render() {
    renderer.render(scene, camera);
}