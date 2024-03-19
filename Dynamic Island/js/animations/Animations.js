'use strict';
import * as THREE from '../library/three.module.js';
import Cloud from '../models/Cloud.js';
import Boat from '../models/Boat.js';
import Man from '../models/Man.js';
import Boat2 from '../models/Boat2.js';
import Wolf from '../models/Wolf.js';
import Smoke from '../models/Smoke.js';
import Birds from '../models/Birds.js';

export default class Animations {
  constructor(scene) {
    const animations = new THREE.Object3D();

    this.timer = 0;

    this.clouds = [
      new Cloud(animations, 1),
      new Cloud(animations, 2),
      new Cloud(animations, 3),
      new Cloud(animations, 4),
      new Cloud(animations, 5),
    ];

    this.chimney = [
      new Smoke(animations, 1),
      new Smoke(animations, 2),
      new Smoke(animations, 3),
      new Smoke(animations, 4),
      new Smoke(animations, 5),
      new Smoke(animations, 6),
    ];

    this.wolf = new Wolf(animations);
    this.boat = new Boat(animations);
    this.boat2 = new Boat2(animations);
    this.man = new Man(animations, 1);
    this.man2 = new Man(animations, 2);

    this.birds = new Birds(animations);

    scene.add(animations);
  }

  animate() {
    this.timer += 1;
    const loopBoat = 12500; //1250; // 9_992
    const loopMan = 1670;

    this.clouds.forEach((cloud) => {
      cloud.animate();
    });

    this.chimney.forEach((smoke) => {
      smoke.animate();
    });

    this.boat2.animate();

    if (this.timer < loopBoat) {
      this.boat.animate();
    } else if (
      this.timer > loopBoat + loopMan &&
      this.timer < loopBoat + loopMan * 2
    ) {
      this.man.animate();
      this.man.hide();
      this.man2.animate();
    } else if (this.timer < loopBoat + loopMan * 2) {
      this.man2.animate();
      this.man2.hide();
      this.man.animate();
    } else if (this.timer > loopBoat + loopMan * 2) {
      this.man2.hide();
      this.timer = 0;
    }

    this.wolf.animate();

    this.birds.animate();
  }
}
