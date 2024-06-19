const mysql = require('mysql2');
const dbConfig = require('../Config/dbConfig');

const pool = mysql.createPool(dbConfig);

const promisePool = pool.promise();

const EventsModel = {
    async createEvent(name, category_id, date, created_by, description) {
        const sql = 'INSERT INTO events (name, category_id, date, created_by, description) VALUES (?, ?, ?, ?, ?)';
        const [result] = await dbConfig.query(sql, [name, category_id, date, created_by, description]);
        return result;
    },

    async getAllEvents() {
        const sql = `SELECT events.*, event_categories.name AS event_category_name, AVG(ratings.rating) AS avg_rating
                FROM events
                JOIN event_categories ON events.category_id = event_categories.id
                LEFT JOIN ratings ON events.id = ratings.event_id
                GROUP BY events.id`;
        const [rows] = await dbConfig.query(sql);
        return rows;
    },

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
    async searchEvents(query) {
        const sql = 'SELECT * FROM events WHERE name LIKE ? OR description LIKE ?';
        const [rows] = await dbConfig.query(sql, [`%${query}%`, `%${query}%`]);
        return rows;
    },
    async getEventByDate(date) {
        const sql = 'SELECT * FROM events WHERE date = ?';
        const [rows] = await dbConfig.query(sql, [date]);
        return rows;
    },
    async getAllCategories() {
        const sql = 'SELECT * FROM event_categories';
        const [rows] = await dbConfig.query(sql);
        return rows;
    },

    async updateEvent(id, name, category_id, date, created_by) {
        const sql = 'UPDATE events SET name = ?, category_id = ?, date = ?, created_by = ? WHERE id = ?';
        const [result] = await promisePool.query(sql, [name, category_id, date, created_by, id]);
        return result;
    },
    async deleteEvent(id) {
        const sql = 'DELETE FROM events WHERE id = ?';
        const [result] = await promisePool.query(sql, [id]);
        return result;
    },
}

module.exports = EventsModel;
