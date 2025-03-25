const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const backgroundBlur = require('../controller/backgroundBlur.controller');
const backgroundEnhancer = require('../controller/background.controller');
const faceRetouch = require('../controller/faceRetouch.controller');
const faceEnhancer = require('../controller/faceEnhancer.controller');
const sharpener = require('../controller/sharpener.controller');

const router = express.Router();
const unlinkAsync = promisify(fs.unlink);
const UPLOAD_DIR = 'uploads/';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        // Create a more organized filename with original extension
        const fileExt = path.extname(file.originalname);
        const fileName = `${Date.now()}-${path.basename(file.originalname, fileExt)}${fileExt}`;
        cb(null, fileName);
    },
});

// Configure file filter for allowed image types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and JPG are allowed.'));
    }
};

// Initialize multer with configuration
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter
});

// Valid filter types and their corresponding filter type options
const VALID_FILTERS = {
  'background-blur': ['light', 'medium', 'strong', 'soft', 'intense', 'gradient'],
  'background-enhancer': ['bright', 'contrast', 'warm', 'cool', 'vibrant', 'dramatic'],
  'face-retouch': ['smooth', 'soft-glow', 'sharp', 'skin-tone', 'soft-focus', 'portrait'],
  'face-enhancer': ['high-sharpness', 'detailed', 'glow', 'definition', 'depth', 'cinematic'],
  'sharpener': ['low', 'medium', 'high', 'adaptive']
};

// Enhancement processor function to handle different filter types
const processEnhancement = async (inputPath, filter, filterType = null) => {
  // Validate filter is one of the allowed types
  if (!VALID_FILTERS[filter]) {
    throw new Error(`Invalid filter type: ${filter}. Valid filters are: ${Object.keys(VALID_FILTERS).join(', ')}`);
  }

  // Normalize filterType to lowercase and use default if not provided
  const normalizedFilterType = filterType ? filterType.toLowerCase() : null;
  const defaultFilterTypes = {
    'background-blur': 'medium',
    'background-enhancer': 'vibrant',
    'face-retouch': 'smooth',
    'face-enhancer': 'detailed',
    'sharpener': 'medium'
  };

  // Use default filter type if none provided
  const finalFilterType = normalizedFilterType || defaultFilterTypes[filter];

  // Validate filter type against the allowed options for the specific filter
  const validFilterTypes = VALID_FILTERS[filter].map(type => type.toLowerCase());
  if (!validFilterTypes.includes(finalFilterType)) {
    throw new Error(
      `Invalid filter type "${filterType}" for filter "${filter}". ` +
      `Valid options are: ${VALID_FILTERS[filter].join(', ')}`
    );
  }

  // Find the original case version of the filter type
  const originalCaseFilterType = VALID_FILTERS[filter].find(
    type => type.toLowerCase() === finalFilterType
  );

  switch (filter) {
    case 'background-blur':
      return await backgroundBlur(inputPath, originalCaseFilterType);
    case 'background-enhancer':
      return await backgroundEnhancer(inputPath, originalCaseFilterType);
    case 'face-retouch':
      return await faceRetouch(inputPath, originalCaseFilterType);
    case 'face-enhancer':
      return await faceEnhancer(inputPath, originalCaseFilterType);
    case 'sharpener':
      return await sharpener(inputPath, originalCaseFilterType);
    default:
      throw new Error(`Unhandled filter type: ${filter}`);
  }
};

router.post("/", upload.single('image'), async (req, res) => {
  let inputPath = null;
  let filter = null;
  let filterType = null;
  
  try {
    // Validate image upload
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: "Please provide an image" 
      });
    }

    // Validate filter parameter
    filter = req.body.filter;
    filterType = req.body.filterType;
    
    if (!filter) {
      return res.status(400).json({ 
        success: false,
        error: "Please provide a filter type",
        validFilters: Object.keys(VALID_FILTERS)
      });
    }

    inputPath = req.file.path;
    
    // Process the enhancement with the single filter
    const outputPath = await processEnhancement(inputPath, filter, filterType);
    
    // Delete the input file after successful processing
    await unlinkAsync(inputPath);
    inputPath = null;
    
    return res.status(200).json({ 
      success: true,
      message: "Enhancement applied successfully", 
      imageUrl: `/uploads/${path.basename(outputPath)}`, // Enhanced image URL
      metadata: {
        filter,
        filterType,
        originalName: req.file.originalname,
        processedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Enhancement error:', error);
    
    // Clean up the input file if it exists and hasn't been deleted yet
    if (inputPath) {
      try {
        await unlinkAsync(inputPath);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    
    let errorMessage = "Failed to apply enhancement";
    if (error.message.includes("Jimp.read is not a function")) {
      errorMessage = "Image processing library initialization failed. Please ensure Jimp is correctly installed and imported.";
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
      details: error.message,
      validFilters: Object.keys(VALID_FILTERS),
      validFilterTypes: filter && VALID_FILTERS[filter] ? VALID_FILTERS[filter] : null
    });
  }
});

router.get("/", async (req, res) => {
    try {
        const files = fs.readdirSync(UPLOAD_DIR);
        const images = files.map(file => {
            const filePath = path.join(UPLOAD_DIR, file);
            const stats = fs.statSync(filePath);
            
            return {
                name: file,
                url: `/uploads/${file}`,
                size: stats.size,
                createdAt: stats.mtime
            };
        }).sort((a, b) => b.createdAt - a.createdAt); // Sort by newest first
        
        return res.status(200).json({
            success: true,
            count: images.length,
            images
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch images",
            details: error.message
        });
    }
});

router.delete("/:filename", async (req, res) => {
    try {
        const filename = req.params.filename;
        const filepath = path.join(UPLOAD_DIR, filename);

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({
                success: false,
                error: "Image not found"
            });
        }
        
        await unlinkAsync(filepath);
        
        return res.status(200).json({
            success: true,
            message: "Image deleted successfully",
            deletedFile: filename
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        return res.status(500).json({
            success: false,
            error: "Failed to delete image",
            details: error.message
        });
    }
});

router.get("/:filename", (req, res) => {
    try {
        const filename = req.params.filename;
        const filepath = path.join(UPLOAD_DIR, filename);
        
        // Check if file exists
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({
                success: false,
                error: "Image not found"
            });
        }
        
        // Get file stats
        const stats = fs.statSync(filepath);
        
        return res.status(200).json({
            success: true,
            image: {
                name: filename,
                url: `/uploads/${filename}`,
                size: stats.size,
                createdAt: stats.mtime,
                path: filepath
            }
        });
    } catch (error) {
        console.error('Error getting image details:', error);
        return res.status(500).json({
            success: false,
            error: "Failed to get image details",
            details: error.message
        });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    filters: VALID_FILTERS
  });
});

// Get available filters and their options
router.get('/filters', (req, res) => {
  res.status(200).json({
    success: true,
    filters: VALID_FILTERS
  });
});

module.exports = router;