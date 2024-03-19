import * as THREE from '../library/three.module.js';
import { GLTFLoader } from '../loaders/GLTFLoader.js';

export default class Smoke {
  constructor(scene, n) {
    this.time = 0;

    this.loader = new GLTFLoader();
    this.smoke = new THREE.Object3D();

    this.c;
    // switch (n) {
    //   case 1:
    //     this.c = [
    //       new THREE.Vector3(10.4, 7, 2.8),
    //       new THREE.Vector3(10.4, 8, 2.8),
    //       new THREE.Vector3(10.4, 14, 2.8),
    //     ];
    //     break;
    //   case 2:
    //     this.c = [
    //       new THREE.Vector3(10.4, 3, 2.8),
    //       new THREE.Vector3(10.4, 9, 2.8),
    //       new THREE.Vector3(10.4, 15, 2.8),
    //     ];
    //     break;
    //   case 3:
    //     this.c = [
    //       new THREE.Vector3(10.4, 4, 2.8),
    //       new THREE.Vector3(10.4, 10, 2.8),
    //       new THREE.Vector3(10.4, 16, 2.8),
    //     ];
    //     break;
    //   case 4:
    //     this.c = [
    //       new THREE.Vector3(10.4, 5, 2.8),
    //       new THREE.Vector3(10.4, 11, 2.8),
    //       new THREE.Vector3(10.4, 17, 2.8),
    //     ];
    //     break;
    //   case 5:
    //     this.c = [
    //       new THREE.Vector3(10.4, 6, 2.8),
    //       new THREE.Vector3(10.4, 12, 2.8),
    //       new THREE.Vector3(10.4, 18, 2.8),
    //     ];
    //     break;
    //   case 6:
    //     this.c = [
    //       new THREE.Vector3(10.4, 7, 2.8),
    //       new THREE.Vector3(10.4, 13, 2.8),
    //       new THREE.Vector3(10.4, 19, 2.8),
    //     ];
    //     break;
    //   default:
    //     break;
    // }

    switch (n) {
      case 1:
        this.c = [
          new THREE.Vector3(10.4, 2, 2.8),
          new THREE.Vector3(10.4, 8, 2.8),
          new THREE.Vector3(10.4, 14, 2.7),
        ];
        break;
      case 2:
        this.c = [
          new THREE.Vector3(10, 3, 2.8),
          new THREE.Vector3(10, 9, 2.8),
          new THREE.Vector3(10, 15, 4),
        ];
        break;
      case 3:
        this.c = [
          new THREE.Vector3(10.4, 4, 2.8),
          new THREE.Vector3(10.4, 10, 2.8),
          new THREE.Vector3(10, 16, 3.5),
        ];
        break;
      case 4:
        this.c = [
          new THREE.Vector3(10, 5, 2.8),
          new THREE.Vector3(10, 11, 2.8),
          new THREE.Vector3(10.8, 17, 3),
        ];
        break;
      case 5:
        this.c = [
          new THREE.Vector3(10.4, 6, 2.8),
          new THREE.Vector3(10.4, 12, 2.8),
          new THREE.Vector3(9.8, 18, 2.8),
        ];
        break;
      case 6:
        this.c = [
          new THREE.Vector3(10, 7, 2.8),
          new THREE.Vector3(10, 13, 2.8),
          new THREE.Vector3(10, 19, 2),
        ];
        break;
      default:
        break;
    }

    this.path = new THREE.CatmullRomCurve3(this.c, false, 'chordal', 1.0);

    this.loader.load('resources/models/LowPoly/cloud.glb', (object) => {
      this.smoke = object.scene.children[0].clone();

      if (n == 1 || n == 3 || n == 5) {
        this.smoke.scale.set(0.01, 0.02, 0.01);
      } else {
        this.smoke.scale.set(0.008, 0.01, 0.008);
      }

      this.smoke.rotateZ(90);

      this.smoke.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(THREE.Color.NAMES.grey);
        }
      });

      scene.add(this.smoke);
    });
  }

  animate() {
    this.time += 0.0005;

    if (this.time > 1.0) {
      this.time = 0;
    }

    this.point = this.path.getPoint(this.time);
    this.smoke.position.set(this.point.x, this.point.y, this.point.z);

    if (this.point.y > 11) {
      this.smoke.position.set(10.4, -10, 2.8);
    } else {
      this.smoke.position.set(this.point.x, this.point.y, this.point.z);
    }
  }
}
