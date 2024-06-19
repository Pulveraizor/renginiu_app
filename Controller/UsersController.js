// UsersController.js

const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const UsersModel = require('../Model/UsersModel'); // Import UsersModel
const router = express.Router();

// POST /register - Register a new user
const UsersController = {
    async registerUser(req, res) {
        const { email, password } = req.body;
        try {
          // Check if user with the same email already exists
          const existingUser = await UsersModel.getUserByEmail(email);
          if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create a new user
          const newUser = await UsersModel.createUser(email, hashedPassword);
          res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    },
      
      // POST /login - User login
      async loginUser  (req, res) {
        const { email, password } = req.body;
        console.log(email, password);
      
        try {
          // Retrieve user by email
          const user = await UsersModel.getUserByEmail(email);
          console.log(user);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Compare passwords
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
          }
      
          // User authenticated
        //   res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
        res.redirect('/');
        } catch (error) {
          console.error('Error logging in user:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
}

// Export the methods
module.exports = UsersController;
