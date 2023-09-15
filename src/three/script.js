//Scene
//Objects
//Camera
//Renderer
import * as THREE from 'three';



//Scene
const scene = new THREE.Scene()

//group
const group = new THREE.Group()


//MESH
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "purple" })
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 1;
// mesh.rotation.x=Math.PI * 0.25



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
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

meshT3.lookAt(mesh.position);

group.add(mesh, meshT, meshT2, meshT3);
group.position.x = 1;
group.position.z = -1;

scene.add(group);


//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // near value is 1 , and far value is 2000
camera.position.z = 3;
camera.position.x = 1;


scene.add(camera);


//Renderers

const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });  // canvas: canvas  add webGLRenderer

renderer.setSize(aspect.width, aspect.height)    //Renderer size

//-.5, -.5

//Resizing
window.addEventListener("resize", () => {
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    //New AspectRation

    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    //New RederSize

    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
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
    vector.set(-cursor.x, -cursor.y, 1);
    vector.unproject(camera);
    mesh.lookAt(vector);
    // Renderer
    renderer.render(scene, camera); // Display what camera see


    // Request Animation
    window.requestAnimationFrame(animate);
};

animate();



//function will get called 60time per second on some devices 0.01 * 60 = 0.6 on Xaxis
//function will get called 120time per second on some devices 0.01 * 120 = 1.2 on Xaxis