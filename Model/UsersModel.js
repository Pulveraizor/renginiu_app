const db = require('../Config/dbConfig');

const UsersModel = {
    // Method to create a new user
    async createUser(email, password, roleId) {
      try {
        const [rows, fields] = await db.execute(
          'INSERT INTO users (email, password, role_id, created) VALUES (?, ?, ?, NOW())',
          [email, password, roleId || 1]
        );
        return rows;
      } catch (error) {
        throw error;
      }
    },
  
    async getUserByEmail(email) {
      try {
        const [rows, fields] = await db.execute(
          'SELECT * FROM users WHERE email = ?',
          [email]
        );
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
  
  };
  
  module.exports = UsersModel;
