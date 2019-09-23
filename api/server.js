const express = require("express");
const authRouter = require("../auth/authRouter");
const plannerRouter = require("../planners/plannerRouter");
const server = express();

server.use(express.json());
server.use("/auth", authRouter);
server.use("/api", plannerRouter);

module.exports = server;
