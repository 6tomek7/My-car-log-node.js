const { createUser } = require("../services/user.service");
exports.putRegister = (req, res) => {
  try {
    const { login, password } = req.body;
    const user = createUser(login, password);

    if (!user) {
      return res.status(409).json({
        message: "The user already exist",
      });
    }

    return res.status(201).json({
      message: "ok",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "something wrong",
    });
  }
};
