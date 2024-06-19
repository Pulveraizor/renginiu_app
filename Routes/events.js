const express = require('express');
const router = express.Router();
const EventsController = require('../Controller/EventsController');

// Create event endpoint
router.post('/create', EventsController.createEvent);
router.post('/delete/{id}', EventsController.deleteEvent);

module.exports = router;
