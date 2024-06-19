const mysql = require('mysql2');
const dbConfig = require('../Config/dbConfig');

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Promisify the pool query function
const promisePool = pool.promise();

const EventsModel = {
    // Create an event
    async createEvent(name, category_id, date, created_by, description) {
        const sql = 'INSERT INTO events (name, category_id, date, created_by, description) VALUES (?, ?, ?, ?, ?)';
        const [result] = await dbConfig.query(sql, [name, category_id, date, created_by, description]);
        return result;
    },

    // Get all events
    async getAllEvents() {
        const sql = 'SELECT * FROM events';
        const [rows] = await dbConfig.query(sql);
        return rows;
    },

    // Get an event by ID
    async getEventById(id) {
        const sql = 'SELECT * FROM events WHERE id = ?';
        const [rows] = await dbConfig.query(sql, [id]);
        return rows[0];
    },
    async getEventByCreator(id) {
        const sql = 'SELECT * FROM events WHERE created_by = ?';
        const [rows] = await dbConfig.query(sql, [id]);
        return rows[0];
    },
    async getEventByDate(date) {
        const sql = 'SELECT * FROM events WHERE date = ?';
        const [rows] = await dbConfig.query(sql, [date]);
        return rows[0];
    },

    // Update an event
    async updateEvent(id, name, category_id, date, created_by) {
        const sql = 'UPDATE events SET name = ?, category_id = ?, date = ?, created_by = ? WHERE id = ?';
        const [result] = await promisePool.query(sql, [name, category_id, date, created_by, id]);
        return result;
    },

    // Delete an event
    async deleteEvent(id) {
        const sql = 'DELETE FROM events WHERE id = ?';
        const [result] = await promisePool.query(sql, [id]);
        return result;
    },
}

module.exports = EventsModel;
