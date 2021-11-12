// All resouce code come from: https://github.com/mrdoob/three.js/
// All settings and usages refers to Three.js Documentation.
// https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

import * as THREE from '../build/three.module.js'
import { FirstPersonControls } from './FirstPersonControls.js'


let camera, controls, scene, renderer, light;

let material1, material2, material3;

let analyser1, analyser2, analyser3;

const clock = new THREE.Clock();

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', init);

function init() {

    const overlay = document.getElementById('overlay');
    overlay.remove();


    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 20, 0);

    const listener = new THREE.AudioListener();
    camera.add(listener);

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0025);

    const spaceTexture = new THREE.TextureLoader().load('../assets/img/background.jpg')
    scene.background = spaceTexture

    // Lighting 
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0.5, 1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Sound spheres
    const sphere = new THREE.SphereGeometry(20, 32, 16);

    material1 = new THREE.MeshPhongMaterial({ color: 0xffaa00, flatShading: true, shininess: 0 });
    material2 = new THREE.MeshPhongMaterial({ color: 0xff2200, flatShading: true, shininess: 0 });
    material3 = new THREE.MeshPhongMaterial({ color: 0x6622aa, flatShading: true, shininess: 0 });

    const mesh1 = new THREE.Mesh(sphere, material1);
    mesh1.position.set(- 250, 30, 0);
    scene.add(mesh1);

    const sound1 = new THREE.PositionalAudio(listener);
    const songElement = document.getElementById('s1');
    sound1.setMediaElementSource(songElement);
    sound1.setRefDistance(20);
    songElement.play();
    mesh1.add(sound1);


    const mesh2 = new THREE.Mesh(sphere, material2);
    mesh2.position.set(250, 30, 0);
    scene.add(mesh2);

    const sound2 = new THREE.PositionalAudio(listener);
    const songElement2 = document.getElementById('s2');
    sound2.setMediaElementSource(songElement2);
    sound2.setRefDistance(20);
    songElement2.play();
    mesh2.add(sound2);

    //

    const mesh3 = new THREE.Mesh(sphere, material3);
    mesh3.position.set(0, 30, - 250);
    scene.add(mesh3);

    const sound3 = new THREE.PositionalAudio(listener);
    const songElement3 = document.getElementById('s3');
    sound3.setMediaElementSource(songElement3);
    sound3.setRefDistance(20);
    songElement3.play();
    mesh3.add(sound3);



    // analysers

    analyser1 = new THREE.AudioAnalyser(sound1, 32);
    analyser2 = new THREE.AudioAnalyser(sound2, 32);
    analyser3 = new THREE.AudioAnalyser(sound3, 32);

    // global ambient audio

    const sound4 = new THREE.Audio(listener);
    const utopiaElement = document.getElementById('s4');
    sound4.setMediaElementSource(utopiaElement);
    sound4.setVolume(0.2);
    utopiaElement.play();

    // Ground

    const helper = new THREE.GridHelper(1000, 10, 0x444444, 0x444444);
    helper.position.y = 0.1;
    scene.add(helper);

    //Render

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Control

    controls = new FirstPersonControls(camera, renderer.domElement);

    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.noFly = true;
    controls.lookVertical = false;
    controls.enableDamping = true

    //

    window.addEventListener('resize', onWindowResize);

    animate();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();

}

function animate() {

    requestAnimationFrame(animate);
    render();

}


function render() {

    const delta = clock.getDelta();

    controls.update(delta);

    material1.emissive.b = analyser1.getAverageFrequency() / 256;
    material2.emissive.b = analyser2.getAverageFrequency() / 256;
    material3.emissive.b = analyser3.getAverageFrequency() / 256;

    renderer.render(scene, camera);

}
