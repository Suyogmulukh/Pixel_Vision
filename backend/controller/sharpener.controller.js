const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const sharpener = async (filepath, filterType, outputDir = 'processed') => {
  const validateInput = () => {
    if (!filepath || typeof filepath !== 'string') {
      throw new Error('Invalid filepath: Must provide a valid string path to an image');
    }
   
    if (!filterType || typeof filterType !== 'string') {
      throw new Error('Invalid filter type: Must specify a valid sharpening level');
    }
  };

  const createOutputDirectory = () => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  };

  const getSharpeningKernel = (type) => {
    const kernels = {
      'low': { kernel: [[0, -0.3, 0], [-0.3, 2.2, -0.3], [0, -0.3, 0]], contrast: 0.1 },
      'medium': { kernel: [[0, -0.5, 0], [-0.5, 3.0, -0.5], [0, -0.5, 0]], contrast: 0.2 },
      'high': { kernel: [[-0.1, -0.6, -0.1], [-0.6, 4.8, -0.6], [-0.1, -0.6, -0.1]], contrast: 0.3 },
      'unblur-light': { kernel: [[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]], contrast: 0.1 },
      'unblur-medium': { kernel: [[-1, -1, -1], [-1, 12, -1], [-1, -1, -1]], contrast: 0.1 },
      'unblur-strong': { kernel: [[-2, -2, -2], [-2, 20, -2], [-2, -2, -2]], contrast: 0.1 }
    };

    const sharpening = kernels[type.toLowerCase()];
    if (!sharpening) {
      throw new Error(`Invalid filter type: '${filterType}' is not a supported sharpening level`);
    }

    return sharpening;
  };

  const enhanceBackground = (image) => {
    // Additional background enhancement techniques
    image
      .normalize()     // Adjust image's color range
      .brightness(0.1) // Slightly increase brightness
      .color([
        { apply: 'saturate', params: [10] },  // Enhance color saturation
        { apply: 'desaturate', params: [5] }  // Fine-tune saturation
      ]);
  };

  try {
    validateInput();
    createOutputDirectory();

    const image = await Jimp.read(filepath);
    const filename = path.basename(filepath, path.extname(filepath));
    const { kernel, contrast } = getSharpeningKernel(filterType);

    image
      .convolute(kernel)
      .contrast(contrast);

    // Optional background enhancement
    enhanceBackground(image);

    const outputPath = path.join(
      outputDir, 
      `${filename}-${filterType}-sharp-${Date.now()}.jpg`
    );

    await image.quality(90).writeAsync(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Error processing image:', error.message);
    throw error;
  }
};

module.exports = sharpener;