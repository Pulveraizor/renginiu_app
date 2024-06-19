// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const dbConfig = require('./Config/dbConfig');

const session = require('express-session');


const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const webRoutes = require('./routes/web');

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/', webRoutes);

// Define a port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
