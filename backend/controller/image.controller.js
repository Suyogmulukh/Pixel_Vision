const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const Image = require('../models/imageUpload.model');

class ImageController {
    constructor(options = {}) {
        this.defaultConfig = {
            uploadDir: path.join(process.cwd(), 'uploads'),
            maxWidth: 1600,
            maxHeight: 1600,
            outputQuality: 90,
            errorHandling: 'throw'
        };
        this.config = { ...this.defaultConfig, ...options };
    }

    async setupUploadDirectory() {
        try {
            await fs.mkdir(this.config.uploadDir, { recursive: true });
        } catch (error) {
            console.error('Upload directory setup failed:', error);
            throw error;
        }
    }

    generateEnhancedFilename() {
        return `enhanced-${Date.now()}.jpg`;
    }

    async processImageEnhancement(imageFile, enhancementType = 'standard') {
        try {
            await this.setupUploadDirectory();

            const filename = this.generateEnhancedFilename();
            const enhancedImagePath = path.join(this.config.uploadDir, filename);

            const enhancedImage = await sharp(imageFile.path)
                .resize(800, 800, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .sharpen()
                .modulate({
                    brightness: 1.05,
                    saturation: 1.1
                })
                .jpeg({ quality: this.config.outputQuality })
                .toFile(enhancedImagePath);

            // Create database entry
            const newImage = new Image({
                filename: filename,
                path: enhancedImagePath,
                originalName: imageFile.originalname,
                mimeType: imageFile.mimetype,
                size: imageFile.size,
                enhancementType: enhancementType,
                url: `/uploads/${filename}`,
                metadata: {
                    originalPath: imageFile.path,
                    processedAt: new Date().toISOString()
                }
            });

            await newImage.save();

            return {
                imageMetadata: newImage.getDetails(),
                processingDetails: {
                    width: enhancedImage.width,
                    height: enhancedImage.height
                }
            };
        } catch (error) {
            console.error('Image enhancement error:', error);
            throw error;
        }
    }

    async getAllImages() {
        try {
            const images = await Image.find({}).sort({ createdAt: -1 });
            return images.map(image => image.getDetails());
        } catch (error) {
            console.error('Error retrieving images:', error);
            throw error;
        }
    }

    async deleteImage(imageId) {
        try {
            const image = await Image.findByIdAndDelete(imageId);
            
            if (!image) {
                throw new Error('Image not found');
            }

            // Optional: Delete physical file
            await fs.unlink(image.path).catch(() => {});

            return { message: 'Image deleted successfully', deletedImage: image };
        } catch (error) {
            console.error('Image deletion error:', error);
            throw error;
        }
    }
}

module.exports = ImageController();