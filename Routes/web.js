const express = require('express');
const path = require('path');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Views/Pages', 'index.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Views/Pages', 'login.html'));
});
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Views/Pages', 'register.html'));
});
router.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Views/Pages', 'create.html'));
});

module.exports = router;
