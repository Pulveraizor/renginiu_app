const express = require('express');
const router = express.Router();
const EventsController = require('../Controller/EventsController');

// Example API endpoint
router.get('/events', EventsController.getAllEvents);
router.get('/search/:query', EventsController.searchEvents);
router.get('/categories', EventsController.getAllCategories);

module.exports = router;