'use strict';

import * as THREE from '../library/three.module.js';

export default class Water {
  constructor(scene) {
    const waterTexture = new THREE.TextureLoader().load(
      'resources/textures/water.jpg'
    );

    waterTexture.wrapS = THREE.RepeatWrapping;
    waterTexture.wrapT = THREE.RepeatWrapping;

    waterTexture.repeat.multiplyScalar(128 / 10);

    this.geometry = new THREE.PlaneBufferGeometry(1550, 1550, 200, 200);

    this.material = new THREE.MeshBasicMaterial({
      envMap: waterTexture,
      color: 0x67c4fa, //0x2a87a0,
      reflectivity: 0.2, // 0.1?
      opacity: 0.5, // 0.9?
    });

    const mesh = new THREE.Mesh(this.geometry, this.material);

    mesh.rotateX(-(Math.PI / 2));

    mesh.position.y = 0.8;

    scene.add(mesh);
  }
}
