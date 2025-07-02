const express = require('express');
const userRoutes = require('./routes/user.routes');
const imageRoutes = require('./routes/image.routes');
const enhanceRoutes = require('./routes/enhance.routes');
const path = require('path');

const router = express.Router();

const _dirname = path.resolve();

// Register all routes
router.use('/users', userRoutes);
router.use('/image', imageRoutes);
router.use('/image/enhance', enhanceRoutes);

router.use(express.static(path.join(_dirname, "/frontend/dist")));
router.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "./frontend/dist/index.html"));
});

module.exports = router;