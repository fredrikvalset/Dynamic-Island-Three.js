"use strict";
import * as THREE from "../library/three.module.js";
import { GLTFLoader } from "../loaders/GLTFLoader.js";

export default class Wolf {
  constructor(scene) {
    this.model = new THREE.Object3D();
    const loader = new GLTFLoader();

    this.clock = new THREE.Clock();

    this.mixer = new THREE.AnimationMixer();

    this.action;
    this.time = 0;

    this.path = new THREE.CatmullRomCurve3( // rød, blå, grønn
      [
        new THREE.Vector3(-25, 3.5, -2),

        new THREE.Vector3(-35, 3.5, 2.5),

        new THREE.Vector3(-33, 3.5, -7),
      ],
      true, //true
      "chordal", //catmullrom, centripetal <- sist , chordal
      1
    );

    //loader.load('resources/models/lowpoly_old_man/scene.gltf', (gltf) => {
    loader.load("resources/models/wolf/wolf.glb", (object) => {
      this.model = object.scene;
      const animation = object.animations;
      this.mixer = new THREE.AnimationMixer(this.model);

      this.action = this.mixer.clipAction(animation[0]);

      // this.a = new AnimationAction(this.mixer, action, this.model);
      this.action.play();

      this.model.position.y = 100;
      this.model.position.x = 0;
      this.model.position.z = 0;
      this.model.scale.set(2, 2, 2);

      // this.model.rotateY(90);

      this.model.traverse((n) => {
        if (n.isMesh) {
          n.castShadow = true;
          n.receiveShadow = false;
        }
      });

      scene.add(this.model);
    });
  }

  animate() {
    const delta = this.clock.getDelta();
    this.mixer.update(delta);

    this.time += 0.001; // 0.001;

    if (this.time > 1.0) {
      this.time = 0;
    }

    this.point = this.path.getPoint(this.time);

    this.model.position.set(this.point.x, this.point.y, this.point.z);

    const tan = this.path.getTangent(this.time);
    this.model.lookAt(tan.add(this.point));
    // this.model.rotateX(Math.PI * (3 / 2));
  }
}
