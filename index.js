// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const dbConfig = require('./Config/dbConfig');

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const webRoutes = require('./routes/web');

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Endpoint to test database connection
app.get('/test-db', (req, res) => {
    pool.query('SELECT 1 + 1 AS result', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ result: results[0].result });
    });
});
app.use(express.static('Public'));
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/', webRoutes);

// Define a port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
