const Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');

const FaceRetoucher = class {
    constructor(settings = {}) {
        this.defaultSettings = {
            outputDir: path.join(process.cwd(), 'processed'),
            maxWidth: 2000,
            maxHeight: 2000,
            quality: 90,
            errorMode: 'throw'
        };
        this.settings = { ...this.defaultSettings, ...settings };
    }

    _setupOutputDirectory = async () => {
        try {
            await fs.mkdir(this.settings.outputDir, { recursive: true });
        } catch (error) {
            console.error('Output directory setup failed:', error);
            throw error;
        }
    }

    _validateInputs = (imagePath, filterType) => {
        if (!imagePath || typeof imagePath !== 'string') {
            throw new Error('Invalid filepath: Must provide a valid string path to an image');
        }

        if (!filterType || typeof filterType !== 'string') {
            throw new Error('Invalid filter type: Must specify a valid filter');
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

    _applyRetouchEffect = (imageData, filterType) => {
        const retouchStyles = {
            'smooth': () => imageData.gaussian(4),

            'soft-glow': () => imageData
                .brightness(0.6)
                .gaussian(7),

            'sharp': () => imageData
                .contrast(0.4)
                .unsharp(),

            'skin-tone': () => imageData
                .color([
                    { apply: 'red', params: [10] },
                    { apply: 'green', params: [10] },
                    { apply: 'yellow', params: [10] }
                ]),

            'soft-focus': () => imageData.blur(8),

            'professional-retouch': () => imageData
                .contrast(0.3)
                .brightness(0.2)
                .gaussian(3),

            'glamour': () => imageData
                .brightness(0.5)
                .contrast(0.3)
                .sepia(0.1),

            'vintage-portrait': () => imageData
                .grayscale()
                .contrast(0.2)
                .brightness(0.1),

            'dramatic-light': () => imageData
                .contrast(0.5)
                .brightness(-0.2)
        };

        if (!retouchStyles[filterType]) {
            throw new Error(`Invalid retouch type: '${filterType}' is not a supported filter`);
        }

        return retouchStyles[filterType]();
    }

    _generateOutputFileName = (sourcePath, filterType) => {
        const filename = path.basename(sourcePath, path.extname(sourcePath));
        return `${filename}-${filterType}-${Date.now()}.jpg`;
    }

    processRetouch = async (imagePath, filterType) => {
        try {
            this._validateInputs(imagePath, filterType);
            await this._setupOutputDirectory();

            const imageData = await this._prepareImage(imagePath);
            const processedImage = this._applyRetouchEffect(imageData, filterType);

            const outputFileName = this._generateOutputFileName(imagePath, filterType);
            const outputPath = path.join(this.settings.outputDir, outputFileName);

            await processedImage.quality(this.settings.quality).writeAsync(outputPath);

            return outputPath;
        } catch (error) {
            if (this.settings.errorMode === 'throw') {
                throw error;
            } else if (this.settings.errorMode === 'silent') {
                console.error('Retouch processing error:', error);
                return null;
            }
            console.error('Retouch processing error:', error);
            throw error;
        }
    }

    processBatch = async (imagePaths, filterType) => {
        const processedImages = [];
        
        for (const imagePath of imagePaths) {
            try {
                const processedPath = await this.processRetouch(imagePath, filterType);
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

module.exports = FaceRetoucher;