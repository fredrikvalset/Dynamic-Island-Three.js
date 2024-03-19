"use strict";
import Utils from "../utils/Utils.js";
import { FBXLoader } from "../loaders/FBXLoader.js";

export default class Tree {
  constructor(scene, geometry) {
    const loader = new FBXLoader();

    loader.load("resources/models/LowPoly/FirTree.FBX", (object) => {
      for (let i = 0; i < 1000; i++) {
        this.tree = object.children[0].clone();

        const x = -100 * Math.random() + 50; // Math.Floor
        const z = -100 * Math.random() + 50;

        const height = geometry.getHeightAt(x, z);

        const low = 2.2;
        const high = 4;

        if (Utils.validPlacement(x, z, low, high, geometry)) {
          this.tree.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          this.tree.position.y = height;
          this.tree.position.x = x;
          this.tree.position.z = z;

          this.tree.scale.set(0.004, 0.004, 0.004);
          scene.add(this.tree);
        }
      }
    });
  }
}
