"use strict";
import Utils from "../utils/Utils.js";
import { FBXLoader } from "../loaders/FBXLoader.js";

export default class Grass {
  constructor(scene, geometry) {
    const loader = new FBXLoader();

    loader.load("resources/models/LowPoly/Grass.FBX", (object) => {
      for (let i = 0; i < 1500; i++) {
        this.grass = object.children[0].clone();

        const x = -100 * Math.random() + 50;
        const z = -100 * Math.random() + 50;

        const height = geometry.getHeightAt(x, z);

        const low = 4;
        const high = 8;

        if (Utils.validPlacement(x, z, low, high, geometry)) {
          this.grass.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          this.grass.position.y = height;
          this.grass.position.x = x;
          this.grass.position.z = z;

          this.grass.scale.set(0.01, 0.01, 0.01);
          scene.add(this.grass);
        }
      }
    });
  }
}
