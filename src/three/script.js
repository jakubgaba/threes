//Scene
//Objects
//Camera
//Renderer
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import bumpTexture from '../assets/bump.jpg';
import colorTexture from '../assets/color.jpg';
import displacementTexture from '../assets/displacementMap.jpg';
import nx from '../assets/nx.png';
import ny from '../assets/ny.png';
import nz from '../assets/nz.png';
import px from '../assets/px.png';
import py from '../assets/py.png';
import pz from '../assets/pz.png';
import * as dat from "dat.gui";

//Scene
const scene = new THREE.Scene()

//Debugging
const gui = new dat.GUI();

//group
const group = new THREE.Group()

//ligths
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(2, 2, 2);
scene.add(ambientLight, pointLight);

// Texture loader
const textureLoader = new THREE.TextureLoader();
const colorTex = textureLoader.load(colorTexture);
const bumpTex = textureLoader.load(bumpTexture);
const displacementTex = textureLoader.load(displacementTexture);
//cubeTextureLoader
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envTexture = cubeTextureLoader.load([
    px, nx, py, ny, pz, nz
])
scene.background = envTexture;
// const geometry = new THREE.BufferGeometry()
// const verticesArray = new Float32Array(
//     [
//         0,0,0,
//         0,1,0,
//         1,0,0
//     ]
// )
// const positionsAttribute = new THREE.BufferAttribute(verticesArray,3);
// geometry.setAttribute('position', positionsAttribute);


const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.9;
material. roughness = 0.1;
material.envMap = envTexture
// material.map = colorTex;
// material.displacementMap = displacementTex;
// material.bumpMap = bumpTex;
// material.shininess = 200;
// material.specular = new THREE.Color("green");
// mesh.position.x = 1;
// mesh.rotation.x=Math.PI * 0.25
const mesh = new THREE.Mesh(geometry, material);


//Range(1)
gui.add(mesh.position,"x").min(-3).max(3).step(0.1).name("X movement");
//Boolean(2)
gui.add(material,"wireframe");

//MESH 2
const geometryT = new THREE.BoxGeometry(1, 1, 1)
const materialT = new THREE.MeshBasicMaterial({ color: "green" })
const meshT = new THREE.Mesh(geometryT, materialT);
meshT.position.x = -1;

//MESH 3
const geometryT2 = new THREE.BoxGeometry(1, 1, 1)
const materialT2 = new THREE.MeshBasicMaterial({ color: "blue" })
const meshT2 = new THREE.Mesh(geometryT2, materialT2);
meshT2.position.y = -1;

//MESH 4
const geometryT3 = new THREE.BoxGeometry(1, 1, 1)
const materialT3 = new THREE.MeshBasicMaterial({ color: "red" })
const meshT3 = new THREE.Mesh(geometryT3, materialT3);
meshT3.position.y = 1;
//AxesHelper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

meshT3.lookAt(mesh.position);

group.add(mesh);


scene.add(group);


//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // near value is 1 , and far value is 2000
camera.position.z = 3;
camera.position.x = 1;


// scene.add(camera);
// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

//Renderers

const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });  // canvas: canvas  add webGLRenderer

renderer.setSize(aspect.width, aspect.height)    //Renderer size

//-.5, -.5

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.autoRotate = true;


//Resizing
window.addEventListener("resize", () => {
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    //New AspectRation

    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    //New RederSize

    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Clocks
const clock = new THREE.Clock();


//Mouse move
const cursor = new THREE.Vector2();
const vector = new THREE.Vector3();

window.addEventListener("mousemove", (event) => {
    cursor.x = (event.clientX / window.innerWidth) * 2 - 1;
    cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
});





const animate = () => {

    // Time delta
    const delta = clock.getDelta();

    // Update target vector and make mesh look at the target



    // Convert the 2D cursor coordinates to 3D world coordinates
    // vector.set(-cursor.x, -cursor.y, 1);
    // vector.unproject(camera);
    // mesh.lookAt(vector);
    // Renderer
    renderer.render(scene, camera); // Display what camera see

    // orbitControls.update();
    // // orbitControls.autoRotateSpeed=6;
    // orbitControls.enableDamping = true;
    // orbitControls.dampingFactor = 0.01;
    // Request Animation
    window.requestAnimationFrame(animate);
};

animate();



//function will get called 60time per second on some devices 0.01 * 60 = 0.6 on Xaxis
//function will get called 120time per second on some devices 0.01 * 120 = 1.2 on Xaxis