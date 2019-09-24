const express = require("express");
const authRouter = require("../auth/authRouter");
const eventRouter = require("../events/eventRouter");
const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use("/auth", authRouter);
server.use("/planner", eventRouter);

module.exports = server;
