const Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');

const BackgroundBlur = class {
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

    _applyBlurEffect = (imageData, blurType) => {
        const blurStyles = {
            'light': () => imageData.blur(5),
            'medium': () => imageData.blur(10),
            'heavy': () => imageData.blur(20),
            'soft': () => imageData.gaussian(5),
            'intense': () => imageData.gaussian(10),
            'subtle': () => imageData.blur(3),
            'extreme': () => imageData.gaussian(15),
            'artistic': () => imageData
                .blur(8)
                .contrast(0.1)
                .brightness(-0.1),
            'dreamy': () => imageData
                .gaussian(7)
                .color([
                    { apply: 'lighten', params: [10] }
                ]),
            'cinematic': () => imageData
                .gaussian(12)
                .contrast(0.2)
                .brightness(-0.2)
        };

        if (!blurStyles[blurType]) {
            throw new Error(`Invalid blur type: ${blurType}`);
        }

        return blurStyles[blurType]();
    }

    _generateOutputFileName = (sourcePath, blurType) => {
        const fileExtension = path.extname(sourcePath) || '.jpg';
        return `blur-${blurType}-${Date.now()}${fileExtension}`;
    }

    processBlur = async (imagePath, blurType = 'medium') => {
        try {
            await this._setupOutputDirectory();
            await this._validateImagePath(imagePath);

            const imageData = await this._prepareImage(imagePath);
            const processedImage = this._applyBlurEffect(imageData, blurType);

            const outputFileName = this._generateOutputFileName(imagePath, blurType);
            const outputPath = path.join(this.outputDir, outputFileName);

            await processedImage.quality(this.settings.quality).writeAsync(outputPath);

            return outputPath;
        } catch (error) {
            if (this.settings.errorMode === 'throw') {
                throw error;
            } else if (this.settings.errorMode === 'silent') {
                console.error('Blur processing error:', error);
                return null;
            }
            console.error('Blur processing error:', error);
            throw error;
        }
    }

    processBatch = async (imagePaths, blurType = 'medium') => {
        const processedImages = [];
        
        for (const imagePath of imagePaths) {
            try {
                const processedPath = await this.processBlur(imagePath, blurType);
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

module.exports = BackgroundBlur;