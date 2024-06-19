const express = require('express');
const EventsModel = require('../Model/EventsModel'); // Import UsersModel

const EventsController = {

    async createEvent (req, res) {
        const { name, category_id, date, description } = req.body;
        try {
          const newEvent = await EventsModel.createEvent(name, category_id, date, 1, description);
          res.redirect('/');
        } catch (error) {
          console.error('Error creating event:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    },
    async deleteEvent (req, res) {
        const { id } = req.params;
        try {
          const deletedEvent = await EventsModel.deleteEvent(id);
          res.status(200).json({ message: 'Event deleted successfully', event: deletedEvent });
        } catch (error) {
          console.error('Error deleting event:', error);
    }
  },
  async getAllEvents(req, res) {
    try {
      const events = await EventsModel.getAllEvents();
      res.status(200).json( events );
    } catch (error) {
      console.error('Error retrieving events:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async searchEvents(req, res) {
    const { query } = req.params;
    try {
      const events = await EventsModel.searchEvents(query);
      res.status(200).json( events );
    } catch (error) {
      console.error('Error searching events:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async getAllCategories(req, res) {
    try {
      const categories = await EventsModel.getAllCategories();
      res.status(200).json( categories );
    } catch (error) {
      console.error('Error retrieving categories:', error);
    }
  }
}

module.exports = EventsController;