const express = require("express");
const usersRouter = express.Router();

usersRouter.post("/register");
usersRouter.get("/login");

module.exports = usersRouter;
