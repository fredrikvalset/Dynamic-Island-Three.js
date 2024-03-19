'use strict';
import * as THREE from '../library/three.module.js';
import { GLTFLoader } from '../loaders/GLTFLoader.js';

export default class Cabin {
  constructor(scene) {
    const loader = new GLTFLoader();
    // this.cabin = new THREE.Object3D();

    loader.load('resources/models/Cabin/cabin.glb', (object) => {
      this.cabin = object.scene.children[0];

      this.cabin.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.cabin.position.y = 5;
      this.cabin.position.x = 10;
      this.cabin.position.z = -1;

      this.cabin.rotateZ(90);
      this.cabin.scale.set(4, 4, 4);
      scene.add(this.cabin);
    });
  }
}
