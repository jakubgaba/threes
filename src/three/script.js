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

//AxesHelper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);


group.add(mesh,meshT);
group.position.x=1;
group.position.z=-2;
scene.add(group);

//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // near value is 1 , and far value is 2000
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1
scene.add(camera);


//Renderer

const canvas = document.querySelector(".draw"); 
const renderer = new THREE.WebGLRenderer({canvas});  // canvas: canvas  add webGLRenderer

renderer.setSize(aspect.width,aspect.height)    //Renderer size

//Clock
const clock = new THREE.Clock();

const animate =()=>{
   
    //ElapsedTime
    const elapsedTime = clock.getElapsedTime();
    console.log(elapsedTime);

    //update rotation on Y axis
    group.rotation.y += 0.01 * Math.PI * 2;

    //renderer
    renderer.render(scene,camera)      //display what camera see
    
    //RequestAnimation
    window.requestAnimationFrame(animate);
}
animate();

//function will get called 60time per second on some devices 0.01 * 60 = 0.6 on Xaxis
//function will get called 120time per second on some devices 0.01 * 120 = 1.2 on Xaxis