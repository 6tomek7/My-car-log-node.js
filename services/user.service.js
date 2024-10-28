const User = require("../models/user.model");
const pool = require("../config/db");

class UserService {
  static async getUser(userId) {
    const user = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);
    const userData = user[0][0];
    return new User(
      userData.id,
      userData.username,
      userData.email,
      userData.language,
      userData.mode,
      userData.birthday,
      userData.gender
    );
  }
}

module.exports = UserService;
