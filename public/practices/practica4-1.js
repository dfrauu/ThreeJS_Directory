import * as THREE from 'three'

let mousePos = {x:.5,y:.5};
document.addEventListener('mousemove',function(event) {
    mousePos = {x:event.clientX/window.innerWidth, y:event.clientY/window.innerHeight};
});
let phase = 0;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 35;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let boxSize = 0.2;
let geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
let materialGreen = new THREE.MeshBasicMaterial({
    transparent: true, color: 0x00ff00, opacity: 0.4, side: THREE.DoubleSide
});

let pitchSegments = 60;
let elevationSegments = pitchSegments/2;
let particles = pitchSegments*elevationSegments;
let side = Math.pow(particles, 1/3);

let radius = 16;
let partentContainer = new THREE.Object3D();
scene.add(partentContainer);

function posInBox(place) {
    return ((place/side) - 0.5) * radius * 1.2;
}

for (let p = 0; p < pitchSegments; p++) {
    let pitch = Math.PI * 2 * p / pitchSegments;
    for (let e = 0; e < elevationSegments; e++) {
        let elevation = Math.PI * ((e / elevationSegments) - 0.5);
        let particle = new THREE.Mesh(geometry, materialGreen);
        partentContainer.add(particle);
        let dest = new THREE.Vector3();
        dest.z = (Math.sin(pitch) * Math.cos(elevation)) * radius;
        dest.x = (Math.cos(pitch) * Math.cos(elevation)) * radius;
        dest.y = Math.sin(elevation) * radius;
        particle.position.x = posInBox(partentContainer.children.length % side);
        particle.position.y = posInBox(Math.floor((partentContainer.children.length/side) % side));
        particle.position.z = posInBox(Math.floor((partentContainer.children.length/Math.pow(side,2)) % side));
        console.log(side, partentContainer.children.length, particle.position.x, particle.position.y, particle.position.z);
        particle.userData = { dests: [dest, particle.position.clone()], speed: new THREE.Vector3() };
    }
}

function render() {
    phase += 0.002;
    for (let i = 0, l = partentContainer.children.length; i < l; i++) {
        let particle = partentContainer.children[i];
        let dest = particle.userData.dests[Math.floor(phase)%particle.userData.dests.length].clone();
        let diff = dest.sub(particle.position);
        particle.userData.speed.divideScalar(1.02);
        particle.userData.speed.add(diff.divideScalar(400));
        particle.position.add(particle.userData.speed);
        particle.lookAt(dest);
    }

    partentContainer.rotation.y = phase*3;
    partentContainer.rotation.x = (mousePos.y - 0.5) * Math.PI;
    partentContainer.rotation.z = (mousePos.x - 0.5) * Math.PI;

    renderer.render(scene, camera);
    requestAnimationFrame(render)
}
render();