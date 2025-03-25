const Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');

const FaceEnhancer = class {
    constructor(settings = {}) {
        this.outputDir = path.join(process.cwd(), 'processed');
        this.defaultSettings = {
            maxWidth: 2000,
            maxHeight: 2000,
            quality: 90,
            errorMode: 'throw'
        };
        this.settings = { ...this.defaultSettings, ...settings };
    }

    _setupOutputDirectory = async () => {
        try {
            await fs.mkdir(this.outputDir, { recursive: true });
        } catch (error) {
            console.error('Output directory setup failed:', error);
            throw error;
        }
    }

    _validateImagePath = async (imagePath) => {
        try {
            await fs.access(imagePath);
        } catch {
            throw new Error(`Image not found: ${imagePath}`);
        }
    }

    _prepareImage = async (imagePath) => {
        const imageData = await Jimp.read(imagePath);

        if (imageData.bitmap.width > this.settings.maxWidth || 
            imageData.bitmap.height > this.settings.maxHeight) {
            imageData.scaleToFit(this.settings.maxWidth, this.settings.maxHeight);
        }

        return imageData;
    }

    _applyEnhancementEffect = (imageData, enhancementType) => {
        const enhancementStyles = {
            'high-sharpness': () => imageData.convolute([
                [-1, -1, -1],
                [-1, 9, -1],
                [-1, -1, -1]
            ]),

            'detailed': () => imageData
                .contrast(0.2)
                .brightness(0.1),

            'glow': () => imageData
                .brightness(1.2)
                .gaussian(4),

            'definition': () => imageData
                .contrast(0.2)
                .unsharp(),

            'depth': () => imageData
                .contrast(0.2)
                .posterize(6),

            'cinematic': () => imageData
                .contrast(0.2)
                .brightness(0.1)
                .gaussian(0.5),

            'professional': () => imageData
                .contrast(0.3)
                .brightness(0.15)
                .quality(95),

            'artistic': () => imageData
                .sepia(0.3)
                .contrast(0.2)
                .brightness(0.1),

            'dramatic': () => imageData
                .contrast(0.4)
                .brightness(-0.1)
                .gaussian(3)
        };

        if (!enhancementStyles[enhancementType]) {
            throw new Error(`Invalid enhancement type: ${enhancementType}`);
        }

        return enhancementStyles[enhancementType]();
    }

    _generateOutputFileName = (sourcePath, enhancementType) => {
        const fileExtension = path.extname(sourcePath) || '.jpg';
        return `enhanced-${enhancementType}-${Date.now()}${fileExtension}`;
    }

    processEnhancement = async (imagePath, enhancementType = 'detailed') => {
        try {
            await this._setupOutputDirectory();
            await this._validateImagePath(imagePath);

            const imageData = await this._prepareImage(imagePath);
            const processedImage = this._applyEnhancementEffect(imageData, enhancementType);

            const outputFileName = this._generateOutputFileName(imagePath, enhancementType);
            const outputPath = path.join(this.outputDir, outputFileName);

            await processedImage.quality(this.settings.quality).writeAsync(outputPath);

            console.log(`Enhancement successfully applied: ${outputPath}`);
            return outputPath;
        } catch (error) {
            if (this.settings.errorMode === 'throw') {
                throw error;
            } else if (this.settings.errorMode === 'silent') {
                console.error('Enhancement processing error:', error);
                return null;
            }
            console.error('Enhancement processing error:', error);
            throw error;
        }
    }

    processBatch = async (imagePaths, enhancementType = 'detailed') => {
        const processedImages = [];
        
        for (const imagePath of imagePaths) {
            try {
                const processedPath = await this.processEnhancement(imagePath, enhancementType);
                if (processedPath) {
                    processedImages.push(processedPath);
                }
            } catch (error) {
                if (this.settings.errorMode === 'throw') {
                    throw error;
                }
                console.error(`Failed to process ${imagePath}:`, error);
            }
        }

        return processedImages;
    }
};

module.exports = FaceEnhancer;