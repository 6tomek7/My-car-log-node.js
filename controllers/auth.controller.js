const AuthService = require("../services/auth.service");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await AuthService.register(username, email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const currentUser = await AuthService.login(username, password);
    res.json(currentUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const newToken = await AuthService.updatePassword(username, oldPassword, newPassword);
    res.json(newToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
