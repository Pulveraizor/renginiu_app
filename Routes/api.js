const express = require('express');
const router = express.Router();
const EventsController = require('../Controller/EventsController');

// Example API endpoint
router.get('/example', (req, res) => {
    res.json({ message: 'This is an example API endpoint' });
});
router.get('/events', EventsController.getAllEvents);

module.exports = router;