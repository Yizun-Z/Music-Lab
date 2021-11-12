// All resouce code come from: https://github.com/mrdoob/three.js/
// All settings and usages refers to Three.js Documentation.
// https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

import * as THREE from '../build/three.module.js'
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xcccccc )

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth * .6,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * .6
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-2, 0, 20)

scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Load 3D model
let mixer = null

const loader = new GLTFLoader();
loader.load("./3d_model/musicNote/scene.gltf", (gltf) => {
    mixer = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.clipAction(gltf.animations[0])

    action.play()

    gltf.scene.scale.set(2,2,2)
    gltf.scene.position.y = -7
    scene.add(gltf.scene);
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Light
const dirLight1 = new THREE.DirectionalLight(0xffffff);
dirLight1.position.set(10, 10, 50);
scene.add(dirLight1)

const dirLight2 = new THREE.DirectionalLight(0xFE3DB1);
dirLight2.position.set(- 40, - 1, - 1)
dirLight2.castShadow = true
scene.add(dirLight2)

const dirLight3 = new THREE.DirectionalLight(0xffffff)
dirLight3.position.set(0,10,0)
scene.add(dirLight3)

const dirLight4 = new THREE.DirectionalLight(0xffffff)
dirLight3.position.set(50,5,5)
scene.add(dirLight4)

const ambientLight = new THREE.AmbientLight(0x404040,10);
scene.add(ambientLight);



// Animate
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if(mixer != null){
        mixer.update(deltaTime * 0.5)
    }

    // gltf.scene.rotation.z = .5 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// Mobile menu
$("#mobile-bars").click(function () {
    // $(".mobile-area").show();

    $(".mobile-area").css("right", "0");

    return false;
});
$("#mobile-close").click(function () {
    $(".mobile-area").css("right", "-100%");

    return false;
});