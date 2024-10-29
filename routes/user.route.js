const userController = require("../controllers/user.controller");
const express = require("express");

const userRoute = express.Router();

userRoute.get("/user/:id", userController.getUser);

module.exports = userRoute;
