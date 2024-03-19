"use strict";
import { GLTFLoader } from "../loaders/GLTFLoader.js";

export default class Crate {
  constructor(scene) {
    const loader = new GLTFLoader();

    loader.load("resources/models/crate/crate.glb", (object) => {
      this.crate = object.scene.children[0];

      this.crate.traverse((child) => {
        if (object.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.crate.position.y = 2; //2.2;
      this.crate.position.x = 9.5;
      this.crate.position.z = -31;

      this.crate.scale.set(0.02, 0.02, 0.02);
      scene.add(this.crate);
    });
  }
}
