const express = require('express');
const multer = require('multer');
const path = require('path');
const { enhanceImage } = require('../controller/image.controller');
const ImageModel = require('../models/imageUpload.model'); // Assuming you have an ImageModel
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, image, cb) => {
        return cb(null, "./upload"); // Corrected the upload directory path
    },
    filename: (req, image, cb) => {
       return cb(null, `${Date.now()}-${image.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single("uploadImage"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image" });
        }
        await newImage.save();
        return res.json({ message: "Image uploaded successfully", image: newImage });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to upload image" });
    }
});

router.get("/", async (req, res) => {
    try {
        const images = await ImageModel.find(); // Corrected the model name
        return res.json(images);

    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch images" });
    }
});

module.exports = router;
