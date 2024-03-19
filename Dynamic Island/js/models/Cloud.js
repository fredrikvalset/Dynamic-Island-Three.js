import * as THREE from "../library/three.module.js";
import { GLTFLoader } from "../loaders/GLTFLoader.js";

export default class Cloud {
  constructor(scene, n) {
    this.time = 0;

    this.loader = new GLTFLoader();
    this.cloud = new THREE.Object3D();

    this.c;
    switch (n) {
      case 1:
        this.c = [
          new THREE.Vector3(-50, 50, 10),
          new THREE.Vector3(-50, 50, 50),
          new THREE.Vector3(50, 50, 10),
          new THREE.Vector3(-50, 50, 10),
        ];
        break;
      case 2:
        this.c = [
          new THREE.Vector3(40, 45, -5),
          new THREE.Vector3(40, 45, -50),
          new THREE.Vector3(-30, 45, -30),
          new THREE.Vector3(40, 45, -20),
        ];
        break;
      case 3:
        this.c = [
          new THREE.Vector3(-100, 50, -10),
          new THREE.Vector3(-80, 50, -50),
          new THREE.Vector3(-60, 50, -10),
          new THREE.Vector3(-120, 50, -10),
        ];
        break;
      case 4:
        this.c = [
          new THREE.Vector3(-75, 50, -20),
          new THREE.Vector3(-60, 50, -65),
          new THREE.Vector3(-40, 50, -33),
          new THREE.Vector3(-100, 50, -28),
        ];
        break;
      case 5:
        this.c = [
          new THREE.Vector3(0, 55, -50),
          new THREE.Vector3(10, 55, -30),
          new THREE.Vector3(0, 55, 30),
          new THREE.Vector3(-10, 55, -10),
        ];
        break;
      default:
        //this code will execute if none of the cases match the expression
        break;
    }

    // switch (n) {
    //   case 1:
    //     this.c = [
    //       new THREE.Vector3(-50, 50, 10),
    //       new THREE.Vector3(-50, 35, 50),
    //       new THREE.Vector3(50, 45, 10),
    //       new THREE.Vector3(-50, 50, 10),
    //     ];
    //     break;
    //   case 2:
    //     this.c = [
    //       new THREE.Vector3(40, 40, -5),
    //       new THREE.Vector3(40, 50, -50),
    //       new THREE.Vector3(-40, 45, -30),
    //       new THREE.Vector3(40, 30, -20),
    //     ];
    //     break;
    //   case 3:
    //     this.c = [
    //       new THREE.Vector3(-100, 80, -10),
    //       new THREE.Vector3(-80, 50, -50),
    //       new THREE.Vector3(-60, 60, -10),
    //       new THREE.Vector3(-120, 55, -10),
    //     ];
    //     break;
    //   default:
    //     //this code will execute if none of the cases match the expression
    //     break;
    // }

    this.path = new THREE.CatmullRomCurve3(
      // [
      //   new THREE.Vector3(-50, 50, 10),
      //   new THREE.Vector3(-50, 35, 50),
      //   new THREE.Vector3(50, 45, 10),
      //   new THREE.Vector3(-50, 50, 10),
      // ]
      this.c,
      true,
      "catmullrom",
      1.0
    );

    this.loader.load("resources/models/LowPoly/cloud.glb", (object) => {
      //  for (let i = 0; i < 3; i++) {
      this.cloud = object.scene.children[0].clone();

      // this.cloud.position.x = -1000;
      // this.cloud.position.y = 50;
      // this.cloud.position.z = -200 + 100 * i;

      this.cloud.scale.set(0.4, 0.4, 0.4);

      this.cloud.rotateZ(180);

      this.cloud.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(THREE.Color.NAMES.whitesmoke);
        }
      });

      //this.clouds.push(this.cloud);
      scene.add(this.cloud);
      // }
    });

    // this.path = new THREE.EllipseCurve(
    //   -100,
    //   50, // ax, aY
    //   100,
    //   10, // xRadius, yRadius
    //   0,
    //   2 * Math.PI, // aStartAngle, aEndAngle
    //   false, // aClockwise
    //   0 // aRotation
    // );
  }

  animate() {
    //bruker en egen tid til å si hvor fort den skal bevege seg i scenen
    this.time += 0.00008;

    //kan bare være mellom 0 og 1 fordi det er forholdet mellom punktene
    if (this.time > 1.0) {
      this.time = 0;
    }

    //henter neste punkt de skal flyttes til
    this.point = this.path.getPoint(this.time);

    //setter modelen i punktet henhodl til x,y,z

    // this.clouds.forEach((object) => {
    //object
    this.cloud.position.set(this.point.x, this.point.y, this.point.z);
    //});
  }
}
