const express = require('express');
const router = express.Router();
const UsersController = require('../Controller/UsersController');

// Register endpoint
router.post('/register', UsersController.registerUser);

// Login endpoint
router.post('/login', UsersController.loginUser);

module.exports = router;
