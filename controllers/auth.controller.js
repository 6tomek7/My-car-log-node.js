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
  const { email, password } = req.body;

  try {
    const token = await AuthService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
