const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.put("/update-password", authController.updatePassword);

// Example of a protected route
authRouter.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", userId: req.userId });
});

module.exports = authRouter;
