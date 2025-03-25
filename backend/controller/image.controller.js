const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

class ImageEnhancer {
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

    _validateInputs = (imageFile, imageId) => {
        if (!imageFile) {
            throw new Error('No image file uploaded');
        }

        if (!imageId) {
            throw new Error('Image ID is required');
        }
    }

    _setupUploadDirectory = async () => {
        try {
            await fs.mkdir(this.config.uploadDir, { recursive: true });
        } catch (error) {
            console.error('Upload directory setup failed:', error);
            throw error;
        }
    }

    _generateEnhancedFilename = () => {
        return `enhanced-${Date.now()}.jpg`;
    }

    _applyEnhancementEffects = async (imagePath, enhancementType = 'standard') => {
        const enhancementStyles = {
            'standard': () => sharp(imagePath)
                .resize(800, 800, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .sharpen()
                .modulate({
                    brightness: 1.05,
                    saturation: 1.1
                })
                .jpeg({ quality: this.config.outputQuality }),

            'professional': () => sharp(imagePath)
                .resize(1200, 1200, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .sharpen(1.5)
                .modulate({
                    brightness: 1.1,
                    saturation: 1.2,
                    hue: 5
                })
                .jpeg({ quality: 95 }),

            'artistic': () => sharp(imagePath)
                .resize(900, 900, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .sharpen(0.8)
                .modulate({
                    brightness: 1.0,
                    saturation: 1.3,
                    hue: 10
                })
                .toColorspace('srgb')
                .jpeg({ quality: 90 }),

            'high-detail': () => sharp(imagePath)
                .resize(1600, 1600, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .sharpen(2)
                .modulate({
                    brightness: 1.15,
                    saturation: 1.15
                })
                .jpeg({ quality: 95 }),

            'vintage': () => sharp(imagePath)
                .resize(800, 800, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .modulate({
                    brightness: 0.9,
                    saturation: 0.8
                })
                .toColorspace('b-w')
                .jpeg({ quality: 85 })
        };

        if (!enhancementStyles[enhancementType]) {
            throw new Error(`Invalid enhancement type: ${enhancementType}`);
        }

        return enhancementStyles[enhancementType]();
    }

    processImageEnhancement = async (imageFile, imageId, enhancementType = 'standard') => {
        try {
            this._validateInputs(imageFile, imageId);
            await this._setupUploadDirectory();

            const filename = this._generateEnhancedFilename();
            const enhancedImagePath = path.join(this.config.uploadDir, filename);

            await this._applyEnhancementEffects(imageFile.path, enhancementType)
                .toFile(enhancedImagePath);

            const imageMetadata = await sharp(enhancedImagePath).metadata();

            return {
                path: enhancedImagePath,
                dimensions: {
                    width: imageMetadata.width,
                    height: imageMetadata.height
                }
            };
        } catch (error) {
            if (this.config.errorHandling === 'throw') {
                throw error;
            }
            console.error('Image enhancement error:', error);
            return null;
        }
    }

    processBatchEnhancement = async (imageFiles, enhancementType = 'standard') => {
        const enhancedImages = [];

        for (const imageFile of imageFiles) {
            try {
                const enhancedImage = await this.processImageEnhancement(
                    imageFile, 
                    imageFile.originalname, 
                    enhancementType
                );
                
                if (enhancedImage) {
                    enhancedImages.push(enhancedImage);
                }
            } catch (error) {
                console.error(`Failed to enhance image: ${imageFile.originalname}`, error);
            }
        }

        return enhancedImages;
    }
}

module.exports =ImageEnhancer;