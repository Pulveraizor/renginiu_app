const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const UsersModel = require('../Model/UsersModel'); // Import UsersModel
const router = express.Router();

const UsersController = {
    async registerUser(req, res) {
        const { email, password } = req.body;
        try {
          const existingUser = await UsersModel.getUserByEmail(email);
          if (existingUser) {
            return res.redirect('/');
          }

          const hashedPassword = await bcrypt.hash(password, 10);
      
          const newUser = await UsersModel.createUser(email, hashedPassword);
          res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    },
      
      async loginUser  (req, res) {
        const { email, password } = req.body;
        console.log(email, password);
      
        try {
          const user = await UsersModel.getUserByEmail(email);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
          }
      
        res.redirect('/');
        } catch (error) {
          console.error('Error logging in user:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
}

module.exports = UsersController;
