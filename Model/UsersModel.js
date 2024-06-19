const db = require('../Config/dbConfig');

const UsersModel = {
    // Method to create a new user
    async createUser(email, password, roleId) {
      try {
        const [rows, fields] = await db.execute(
          'INSERT INTO users (email, password, role_id, created) VALUES (?, ?, ?, NOW())',
          [email, password, roleId || 2] // Ensure roleId is null if undefined
        );
        return rows;
      } catch (error) {
        throw error;
      }
    },
  
    // Method to get user by email
    async getUserByEmail(email) {
      try {
        const [rows, fields] = await db.execute(
          'SELECT * FROM users WHERE email = ?',
          [email]
        );
        return rows[0]; // Return the first user found
      } catch (error) {
        throw error;
      }
    },
  
    // Add more methods as needed (updateUser, deleteUser, etc.)
  };
  
  module.exports = UsersModel;
