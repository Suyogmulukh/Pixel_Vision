const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('../models/imageUpload.model');
const { authenticateUser } = require('../middlewares/auth.middlewares'); 
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        // Create directory if it doesn't exist
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Add file size limit and better error handling
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1 // Allow only 1 file upload at a time
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP are allowed.'));
        }
    }
}).single('image');

// Wrap upload middleware in error handler
router.post("/upload", (req, res) => {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    error: 'File size too large. Maximum size is 5MB'
                });
            }
            return res.status(400).json({
                success: false,
                error: err.message
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                error: err.message
            });
        }
        // Continue with your existing upload logic
        if (!req.file) {
            return res.status(400).json({ success: false,error: "Please upload an image" });
        }

        const newImage = new Image({
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: `/uploads/${req.file.filename}`,
        });

        newImage.save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    message: "Image uploaded successfully",
                    image: {
                        id: newImage._id,
                        filename: newImage.filename,
                        path: newImage.path,
                        size: newImage.size
                    }
                });
            })
            .catch(error => {
                console.error("Error uploading image:", error);
                return res.status(500).json({
                    success: false,
                    error: "Failed to upload image. Please try again."
                });
            });
    });
});

router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
        const skip = (page - 1) * limit;
        
        const totalImages = await Image.countDocuments();
        
        const images = await Image.find()
            .sort({ [sort]: -1 })
            .limit(parseInt(limit))
            .skip(skip)
            .select('_id filename path createdAt');
        
        return res.status(200).json({
            success: true,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalImages / limit),
            totalImages,
            count: images.length,
            images
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        
        return res.status(500).json({
            success: false,
            error: "Failed to fetch images. Please try again."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ success: false,error: "Image not found" });
        }
        
        return res.status(200).json({
            success: true,
            image
        });
    } catch (error) {
        console.error("Error fetching image:", error);
        
        return res.status(500).json({
            success: false,
            error: "Failed to fetch image. Please try again."
        });
    }
});

router.delete("/:id", 
    async (req, res) => {
        try {
            const image = await Image.findById(req.params.id);
            if (!image) {
                return res.status(404).json({success: false,error: "Image not found" });
            }
            const filePath = path.join(__dirname, '..', 'uploads', image.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            
            // Delete from database
            await Image.findByIdAndDelete(req.params.id);
            
            return res.status(200).json({
                success: true,
                message: "Image deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting image:", error);
            
            return res.status(500).json({
                success: false,
                error: "Failed to delete image. Please try again."
            });
        }
    }
);

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        // Multer-specific errors
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({success: false,error: "File is too large. Maximum file size is 5MB."});
        }
        return res.status(400).json({
            success: false,
            error: error.message
        });
    } else if (error) {
        // Other errors
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
    next();
});

module.exports = router;