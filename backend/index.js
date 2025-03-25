const express = require('express');
const userRoutes = require('./user.routes');
const imageRoutes = require('./image.routes');
const enhanceRoutes = require('./enhance.routes');

const router = express.Router();

// Register all routes
router.use('/users', userRoutes);
router.use('/image', imageRoutes);
router.use('/image/enhance', enhanceRoutes);

module.exports = router;