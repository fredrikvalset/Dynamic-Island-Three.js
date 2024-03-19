'use strict';
import * as THREE from '../library/three.module.js';
import { GLTFLoader } from '../loaders/GLTFLoader.js';

export default class Man {
  constructor(scene, n) {
    const loader = new GLTFLoader();

    this.model = new THREE.Object3D();
    this.clock = new THREE.Clock();
    this.mixer = new THREE.AnimationMixer();
    this.action;

    this.time = 0;

    if (n == 1) {
      this.path = new THREE.CatmullRomCurve3(
        [new THREE.Vector3(9, 1.8, -23), new THREE.Vector3(9, 1.8, -30)],
        true,
        'chordal', //catmullrom, centripetal, chordal
        1
      );
    } else {
      this.path = new THREE.CatmullRomCurve3(
        [new THREE.Vector3(9, 1.8, -23), new THREE.Vector3(9, 1.8, -30)],
        true,
        'chordal', //catmullrom, centripetal, chordal
        1
      );
    }

    loader.load(`resources/models/fisherman/fisherman_${n}.gltf`, (object) => {
      this.model = object.scene;
      const animation = object.animations;
      this.mixer = new THREE.AnimationMixer(this.model);
      this.action = this.mixer.clipAction(animation[0]);

      this.action.play();

      this.model.position.y = -10;
      this.model.position.x = 0;
      this.model.position.z = 0;
      this.model.scale.set(0.32, 0.32, 0.32);

      this.model.traverse((n) => {
        if (n.isMesh) {
          n.castShadow = true;
          n.receiveShadow = false;
        }
      });

      scene.add(this.model);
    });
  }

  hide() {
    this.model.position.y = -10;
    this.model.position.x = 0;
    this.model.position.z = 0;
  }

  animate() {
    const delta = this.clock.getDelta();
    this.mixer.update(delta);

    this.time += 0.0003; // 0.001;

    if (this.time > 1.0) {
      this.time = 0;
    }

    this.point = this.path.getPoint(this.time);

    this.model.position.set(this.point.x, this.point.y, this.point.z);

    const tan = this.path.getTangent(this.time);
    this.model.lookAt(tan.add(this.point));
  }
}
