const UserService = require("../services/user.service");

exports.getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserService.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};
