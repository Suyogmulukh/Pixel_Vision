const Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');

const Background = class {
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
            console.error('Directory creation failed:', error);
            throw error;
        }
    }

    _validateAndPrepareImage = async (imagePath) => {
        try {
            await fs.access(imagePath);
        } catch {
            throw new Error(`Image not found: ${imagePath}`);
        }

        const imageData = await Jimp.read(imagePath);

        if (imageData.bitmap.width > this.settings.maxWidth || 
            imageData.bitmap.height > this.settings.maxHeight) {
            imageData.scaleToFit(this.settings.maxWidth, this.settings.maxHeight);
        }

        return imageData;
    }

    _generateFilterEffect = (imageData, filterType) => {
        const filterStyles = {
            'vibrant': () => imageData
                .color([
                    { apply: 'saturate', params: [50] },
                    { apply: 'contrast', params: [0.2] }
                ])
                .brightness(0.1),

            'cinematic': () => imageData
                .contrast(0.5)
                .color([
                    { apply: 'saturate', params: [30] },
                    { apply: 'blue', params: [15] }
                ])
                .brightness(-0.1),

            'vintage': () => imageData
                .sepia(0.5)
                .color([
                    { apply: 'desaturate', params: [10] },
                    { apply: 'brighten', params: [5] }
                ]),

            'dramatic': () => imageData
                .contrast(0.7)
                .color([
                    { apply: 'saturate', params: [40] }
                ])
                .brightness(0.1),

            'pastel': () => imageData
                .color([
                    { apply: 'desaturate', params: [30] },
                    { apply: 'lighten', params: [20] }
                ]),

            'dark': () => imageData
                .contrast(0.4)
                .brightness(-0.2)
                .color([
                    { apply: 'darken', params: [10] }
                ])
        };

        if (!filterStyles[filterType]) {
            throw new Error(`Invalid filter: ${filterType}`);
        }

        return filterStyles[filterType]();
    }

    _createOutputFileName = (sourcePath, filterType) => {
        const fileExtension = path.extname(sourcePath) || '.jpg';
        return `processed-${filterType}-${Date.now()}${fileExtension}`;
    }

    processImage = async (imagePath, filterType = 'vibrant') => {
        try {
            await this._setupOutputDirectory();

            const imageData = await this._validateAndPrepareImage(imagePath);
            const processedImage = this._generateFilterEffect(imageData, filterType);

            const outputFileName = this._createOutputFileName(imagePath, filterType);
            const outputPath = path.join(this.outputDir, outputFileName);

            await processedImage.quality(this.settings.quality).writeAsync(outputPath);

            return outputPath;
        } catch (error) {
            if (this.settings.errorMode === 'throw') {
                throw error;
            } else if (this.settings.errorMode === 'silent') {
                console.error('Processing error:', error);
                return null;
            }
            console.error('Processing error:', error);
            throw error;
        }
    }

    processBatch = async (imagePaths, filterType = 'vibrant') => {
        const processedImages = [];
        
        for (const imagePath of imagePaths) {
            try {
                const processedPath = await this.processImage(imagePath, filterType);
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

module.exports = Background;