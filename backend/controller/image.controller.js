const sharp = require('sharp');
const ImageModel = require('../models/imageUpload.model');

const enhanceImage = async (req, res) => {
  try {
    const { path: imagePath } = req.file;
    const enhancedImagePath = `uploads/enhanced-${Date.now()}.jpg`;

    await sharp(imagePath)
      .resize(800, 800)
      .toFile(enhancedImagePath);

    const imageUpload = await ImageModel.findById(req.body.imageId);
    imageUpload.enhancedImage = enhancedImagePath;
    await imageUpload.save();

    res.json({ message: 'Image enhanced successfully', enhancedImage: enhancedImagePath });
  } catch (error) {
    console.error('Error enhancing image:', error);
    res.status(500).json({ error: 'Failed to enhance image' });
  }
};

module.exports = { enhanceImage };
