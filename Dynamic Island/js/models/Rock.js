"use strict";
import Utils from "../utils/Utils.js";
import { FBXLoader } from "../loaders/FBXLoader.js";

export default class Rock {
  constructor(scene, geometry) {
    const loader = new FBXLoader();

    loader.load("resources/models/LowPoly/Rock.FBX", (object) => {
      for (let i = 0; i < 1600; i++) {
        this.rock = object.children[0].clone();

        const x = -100 * Math.random() + 50;
        const z = -100 * Math.random() + 50;

        const height = geometry.getHeightAt(x, z);

        const low = 8;
        const high = 12;

        if (Utils.validPlacement(x, z, low, high, geometry)) {
          this.rock.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          this.rock.position.y = height;
          this.rock.position.x = x;
          this.rock.position.z = z;

          this.rock.scale.set(0.004, 0.004, 0.004);
          scene.add(this.rock);
        }
      }
    });
  }
}
