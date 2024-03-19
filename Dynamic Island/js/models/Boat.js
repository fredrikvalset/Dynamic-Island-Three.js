'use strict';
import * as THREE from '../library/three.module.js';
import { GLTFLoader } from '../loaders/GLTFLoader.js';

export default class Boat {
  constructor(scene) {
    this.time = 0;

    const loader = new GLTFLoader();
    this.boat = new THREE.Object3D();

    //  new THREE.Vector3(10, 1, -19),
    //   new THREE.Vector3(35, 1, 0),
    //   new THREE.Vector3(80, 1, 0), // 1
    //   new THREE.Vector3(80, 1, 5),
    //   new THREE.Vector3(35, 1, 0),
    //   new THREE.Vector3(10, 1, -19),

    this.path = new THREE.CatmullRomCurve3( // rød, blå, grønn
      [
        new THREE.Vector3(10, 1, -19.8),
        new THREE.Vector3(30, 1, 2),
        new THREE.Vector3(70, 1, -2), // 1
        new THREE.Vector3(70, 1, 3),
        new THREE.Vector3(30, 1, 2),
        new THREE.Vector3(10, 1, -19.8),
        // new THREE.Vector3(80, 1, 80),
        // new THREE.Vector3(0, 1, 80),
        // new THREE.Vector3(-50, 1, 80),
        // new THREE.Vector3(-50, 1, -80),
        // new THREE.Vector3(-50, 1, -100),
        // new THREE.Vector3(50, 1, -50),
        // new THREE.Vector3(80, 1, 0),
        // new THREE.Vector3(35, 1, 0),
        // new THREE.Vector3(10, 1, -19),
      ],
      false, //true
      'catmullrom', //centripetal , chordal
      1
    );

    loader.load('resources/models/boats/boat.glb', (object) => {
      this.boat = object.scene.children[0];
      this.boat.scale.set(0.01, 0.01, 0.01);

      // this.boat.traverse((object) => {
      //   if (object.isMesh) {
      //   }
      // });

      //const axesHelper = new THREE.AxesHelper(1000);
      // this.boat.add(axesHelper);

      scene.add(this.boat);
    });
  }

  animate() {
    this.time += 0.00008;

    if (this.time > 1.0) {
      this.time = 0;
    }

    this.point = this.path.getPoint(this.time);

    this.boat.position.set(this.point.x, this.point.y, this.point.z);

    const tangent = this.path.getTangent(this.time);
    this.boat.lookAt(tangent.add(this.point));
    this.boat.rotateX(Math.PI * (3 / 2));
  }
}
