'use strict';
import { FBXLoader } from '../loaders/FBXLoader.js';

export default class Dock {
  constructor(scene) {
    const loader = new FBXLoader();

    loader.load('resources/models/Dock/dock.fbx', (object) => {
      this.dock = object.children[0];

      this.dock.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.dock.position.y = 0.5;
      this.dock.position.x = 9;
      this.dock.position.z = -27;

      this.dock.rotateY(0);
      this.dock.scale.set(0.006, 0.006, 0.006);
      scene.add(this.dock);
    });
  }
}
