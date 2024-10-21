const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

class AuthService {
  static async register(username, email, password) {
    const [existingUsers] = await pool.execute("SELECT * FROM users WHERE email = ? OR username = ?", [
      email,
      username,
    ]);

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.username === username) {
        throw new Error("Username already exists");
      }
      if (existingUser.email === email) {
        throw new Error("Email already exists");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
      username,
      email,
      hashedPassword,
    ]);
  }

  static async login(username, password) {
    const [users] = await pool.execute("SELECT * FROM users WHERE username = ?", [username]);

    if (users.length === 0) {
      throw new Error(`User ${username} does not exist`);
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }
}

module.exports = AuthService;
