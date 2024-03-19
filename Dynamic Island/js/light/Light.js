'use strict';

import * as THREE from '../library/three.module.js';

export default class Light {
  constructor(scene) {
    const ambient = new THREE.AmbientLight(0x404040, 2.4); // 2.4 - 0x404040
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 1.3); // 1
    sun.position.set(200, 150, 0);

    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 1000;

    sun.castShadow = true;
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.bottom = -30;
    sun.shadow.camera.top = 30;

    scene.add(sun);

    // const helper = new THREE.CameraHelper(sun.shadow.camera);
    // scene.add(helper);
  }
}
