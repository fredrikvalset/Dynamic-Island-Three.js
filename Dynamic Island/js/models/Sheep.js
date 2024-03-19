'use strict';
import { FBXLoader } from '../loaders/FBXLoader.js';

export default class Sheep {
  constructor(scene) {
    const loader = new FBXLoader();

    loader.load('resources/models/Sheep/sheep.fbx', function (object) {
      let sheep = object.children[0];

      sheep.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      sheep.position.y = 5.5;
      sheep.position.x = -16;
      sheep.position.z = 0;

      sheep.rotateY(1.9);
      sheep.scale.set(0.5, 0.5, 0.5);
      scene.add(sheep);
    });
  }
}
