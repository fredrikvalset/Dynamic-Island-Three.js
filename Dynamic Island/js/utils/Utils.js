'use strict';

export default class utils {
  static loadImage(url) {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject('No URL was specified.');
      }

      let image = new Image();
      image.src = url;

      image.addEventListener('load', () => {
        resolve(image);
      });

      image.addEventListener('error', () => {
        reject(
          'Unable to load image. Make sure the URL is correct (' +
            image.src +
            ').'
        );
      });
    });
  }

  static getHeightmapData(image, size) {
    let canvas = document.createElement('canvas');

    // Assume texture is a square
    canvas.width = size;
    canvas.height = size;

    let context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    let data = new Float32Array(size * size);

    context.drawImage(image, 0, 0, size, size);

    let imageData = context.getImageData(0, 0, size, size).data;

    imageData.forEach((a, i) => {
      if (i % 4 === 0) {
        // Only extract the first component of (r,g,b,a).
        data[Math.floor(i / 4)] = a / 255;
      }
    });

    return data;
  }

  static validPlacement(x, z, low, high, geometry) {
    const cabinX = 1;
    const cabinZ = 5.5;

    const height = geometry.getHeightAt(x, z);
    const check1 = geometry.getHeightAt(x + 1, z + 1);
    const check2 = geometry.getHeightAt(x - 1, z - 1);
    const check3 = geometry.getHeightAt(x + 1, z - 1);
    const check4 = geometry.getHeightAt(x - 1, z + 1);

    if (
      height > low &&
      height < high &&
      check1 > low &&
      check1 < high &&
      check2 > low &&
      check2 < high &&
      check3 > low &&
      check3 < high &&
      check4 > low &&
      check4 < high &&
      (cabinX < x || -cabinX > x) &&
      (cabinZ < z || -cabinZ > z)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
