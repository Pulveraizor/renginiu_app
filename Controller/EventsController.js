const express = require('express');
const EventsModel = require('../Model/EventsModel'); // Import UsersModel

const EventsController = {

    async createEvent (req, res) {
        console.log(req.body);
        const { name, category_id, date, description } = req.body;
        console.log(name, category_id, date, 1, description);
        try {
          // Create a new event
          const newEvent = await EventsModel.createEvent(name, category_id, date, 1, description);
          res.status(201).json({ message: 'Event created successfully', event: newEvent });
        } catch (error) {
          console.error('Error creating event:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    },
    async deleteEvent (req, res) {
        const { id } = req.params;
        try {
          // Delete the event
          const deletedEvent = await EventsModel.deleteEvent(id);
          res.status(200).json({ message: 'Event deleted successfully', event: deletedEvent });
        } catch (error) {
          console.error('Error deleting event:', error);
    }
  },
  async getAllEvents(req, res) {
    try {
      // Retrieve all events
      const events = await EventsModel.getAllEvents();
      res.status(200).json( events );
    } catch (error) {
      console.error('Error retrieving events:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = EventsController;