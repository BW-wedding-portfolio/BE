const express = require("express");
const authRouter = require("../auth/authRouter");
const eventRouter = require("../events/eventRouter");
const plannerRouter = require("../planners/plannerRouter");
const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use("/auth", authRouter);
server.use("/events", eventRouter);
server.use("/planners", plannerRouter);

module.exports = server;
