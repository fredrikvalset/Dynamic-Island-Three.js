'use strict';
import * as THREE from './library/three.module.js';
import Utils from './utils/Utils.js';
import { VRButton } from './vrbutton/VRButton.js';
import { OrbitControls } from './controls/OrbitControls.js';
import Terrain from './terrain/Terrain.js';
import Skybox from './skybox/Skybox.js';
import Light from './light/Light.js';
import Animations from './animations/Animations.js';

async function init() {
  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas'),
    antialias: true,
  });

  renderer.setClearColor(0xffffff, 1.0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Scene
  const scene = new THREE.Scene();

  // const axesHelper = new THREE.AxesHelper(150);
  // scene.add(axesHelper);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z += 0;
  camera.position.x += 100;
  camera.position.y += 70;

  camera.lookAt(0, 0, 0);
  scene.add(camera);

  // VR
  document.body.appendChild(VRButton.createButton(renderer));
  renderer.xr.enabled = true;

  const cameraVR = new THREE.Object3D();
  cameraVR.position.set(110, 50, -50);
  cameraVR.rotateY((Math.PI * 2) / 3);

  renderer.xr.addEventListener('sessionstart', () => {
    scene.add(cameraVR);
    cameraVR.add(camera);
  });

  // Controls
  let controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI / 2.1;
  controls.screenSpacePanning = false;

  // Light
  const light = new Light(scene);

  // Skybox
  const skybox = new Skybox(scene);

  // Terrain
  const heightmap = await Utils.loadImage(
    'resources/images/heightmap/heightmap.png'
  );
  const terrain = new Terrain(scene, heightmap);

  // Animations
  const animation = new Animations(scene);

  renderer.setAnimationLoop(loop);

  // Loop
  function loop() {
    renderer.shadowMap.enabled = true;

    // Animate
    animation.animate();

    // Updating
    updateRendererSize();
    controls.update();

    renderer.render(scene, camera);
  }

  function updateRendererSize() {
    const { x: currentWidth, y: currentHeight } = renderer.getSize(
      new THREE.Vector2()
    );
    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;

    if (width !== currentWidth || height !== currentHeight) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }
  loop();
}

init();
