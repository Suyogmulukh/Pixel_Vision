const express = require('express');
const router = express.Router();
const { body } = require('express-validator');  
const userController = require('../controller/user.controller');
const authMiddleware = require('../middlewares/auth.middlewares');


router.post('/register', [
    body ('email').isEmail().withMessage('Invalid email'),
    body ('fullname').isLength({min: 3}).withMessage('Invalid fullname'),
    body ('password').isLength({min: 6}).withMessage('Invalid password'),
], 
    userController.registerUser

);  // registers a user

router.post('/login', [
    body ('email').isEmail().withMessage('Invalid email'),
    body ('password').isLength({min: 6}).withMessage('Invalid password'),
], 
    userController.loginUser
);  // logs in a user

router.get('/profile',authMiddleware.authUser, userController.getUserProfile);  // gets the user profile

router.get('/logout', authMiddleware.authUser, userController.logoutUser);  // logs out a user

module.exports = router; 