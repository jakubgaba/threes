//Scene
//Objects
//Camera
//Renderer


//Scene
const scene = new THREE.Scene()


//MESH
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "purple" })
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // near value is 1 , and far value is 2000
scene.add(camera);