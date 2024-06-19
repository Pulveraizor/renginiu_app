const mysql = require('mysql2');
const dbConfig = require('../Config/dbConfig');

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Promisify the pool query function
const promisePool = pool.promise();

class EventsModel {
    // Create an event
    static async createEvent(name, category_id, date, created_by) {
        const sql = 'INSERT INTO events (name, category_id, date, created_by) VALUES (?, ?, ?, ?)';
        const [result] = await promisePool.query(sql, [name, category_id, date, created_by]);
        return result;
    }

    // Get all events
    static async getAllEvents() {
        const sql = 'SELECT * FROM events';
        const [rows] = await promisePool.query(sql);
        return rows;
    }

    // Get an event by ID
    static async getEventById(id) {
        const sql = 'SELECT * FROM events WHERE id = ?';
        const [rows] = await promisePool.query(sql, [id]);
        return rows[0];
    }

    // Update an event
    static async updateEvent(id, name, category_id, date, created_by) {
        const sql = 'UPDATE events SET name = ?, category_id = ?, date = ?, created_by = ? WHERE id = ?';
        const [result] = await promisePool.query(sql, [name, category_id, date, created_by, id]);
        return result;
    }

    // Delete an event
    static async deleteEvent(id) {
        const sql = 'DELETE FROM events WHERE id = ?';
        const [result] = await promisePool.query(sql, [id]);
        return result;
    }
}

module.exports = EventsModel;
