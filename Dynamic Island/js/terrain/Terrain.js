"use strict";
import * as THREE from "../library/three.module.js";
import TextureSplattingMaterial from "../splatmap/TextureSplattingMaterial.js";
import TerrainBufferGeometry from "./TerrainBufferGeometry.js";
import Water from "../water/Water.js";
import Tree from "../models/Tree.js";
import Rock from "../models/Rock.js";
import Cabin from "../models/Cabin.js";
import Dock from "../models/Dock.js";
import Sheep from "../models/Sheep.js";
import Grass from "../models/Grass.js";
import Crate from "../models/Crate.js";

export default class Terrain {
  constructor(scene, heightmapImage) {
    const resolution = 128;

    const geometry = new TerrainBufferGeometry({
      heightmapImage,
    });

    const grassTexture = new THREE.TextureLoader().load(
      "resources/textures/grass.png"
    );

    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.multiplyScalar(resolution / 18);

    const rockTexture = new THREE.TextureLoader().load(
      "resources/textures/rock.png"
    );

    rockTexture.wrapS = THREE.RepeatWrapping;
    rockTexture.wrapT = THREE.RepeatWrapping;
    rockTexture.repeat.multiplyScalar(resolution / 10);

    const dirtTexture = new THREE.TextureLoader().load(
      "resources/textures/Dirt.png"
    );
    dirtTexture.wrapS = THREE.RepeatWrapping;
    dirtTexture.wrapT = THREE.RepeatWrapping;
    dirtTexture.repeat.multiplyScalar(resolution / 10);

    const alphaMap = new THREE.TextureLoader().load(
      "resources/images/alpha_map/alpha.png"
    );

    const alphaMap2 = new THREE.TextureLoader().load(
      "resources/images/alpha_map/alpha2.png"
    );

    const material = new TextureSplattingMaterial({
      colorMaps: [grassTexture, rockTexture, dirtTexture],
      alphaMaps: [alphaMap, alphaMap2],
    });

    const terrain = new THREE.Mesh(geometry, material);

    terrain.castShadow = true;
    terrain.receiveShadow = true;

    scene.add(terrain);

    const dock = new Dock(terrain);
    const cabin = new Cabin(terrain);
    const tree = new Tree(terrain, geometry);
    const grass = new Grass(terrain, geometry);
    const sheep = new Sheep(terrain);
    const rockT = new Rock(terrain, geometry);

    const water = new Water(terrain);

    const crate = new Crate(terrain);

    const sunImg = new THREE.TextureLoader().load(
      "resources/images/sun/sun.png"
    );

    let sunSprite = new THREE.SpriteMaterial({ map: sunImg });
    let sun = new THREE.Sprite(sunSprite);

    sun.position.x = 200;
    sun.position.y = 150;
    sun.position.z = 0;

    sun.scale.multiplyScalar(50);

    terrain.add(sun);
  }
}
