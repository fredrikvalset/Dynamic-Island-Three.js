import * as THREE from '../library/three.module.js';

export default class Skybox {
  constructor(scene) {
    scene.background = new THREE.CubeTextureLoader()
      .setPath('resources/skybox/')
      .load([
        //'right','left', 'top', 'bottom', 'front', 'back'
        //  x    , -x   ,   y  ,   -y    ,   -z   ,   z
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
      ]);
  }
}
