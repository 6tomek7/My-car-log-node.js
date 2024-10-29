const express = require("express");
const { json, urlencoded } = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(json());
server.use(urlencoded({ extended: true }));

server.use("/auth", authRoutes);
server.use("/", userRoutes);

server.listen(8080, () => {});
