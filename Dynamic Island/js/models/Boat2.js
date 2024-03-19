'use strict';
import * as THREE from '../library/three.module.js';
import { OBJLoader } from '../loaders/OBJLoader.js';
import { GLTFLoader } from '../loaders/GLTFLoader.js';

export default class Boat2 {
  constructor(scene) {
    this.time = 0;

    const loader = new GLTFLoader();
    this.boat = new THREE.Object3D();

    this.path = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-100, 6.36, 80),
        new THREE.Vector3(-100, 6.36, -80),
        new THREE.Vector3(100, 6.36, -80),
        new THREE.Vector3(100, 6.36, 80),
      ],
      true, //true
      'catmullrom', //centripetal , chordal
      1
    );

    loader.load('resources/models/boats/boat2.glb', (object) => {
      this.boat = object.scene.children[0];
      this.boat.scale.set(0.3, 0.3, 0.3);

      scene.add(this.boat);
    });
  }

  animate() {
    this.time += 0.00001;

    if (this.time > 1.0) {
      this.time = 0;
    }

    this.point = this.path.getPoint(this.time);

    this.boat.position.set(this.point.x, this.point.y, this.point.z);

    const tangent = this.path.getTangent(this.time);
    this.boat.lookAt(tangent.add(this.point));
    this.boat.rotateY((Math.PI * 3) / -2);
  }
}
