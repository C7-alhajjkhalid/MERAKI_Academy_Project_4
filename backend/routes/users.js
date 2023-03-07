const express = require("express");
const usersRouter = express.Router();
const { register, login } = require("../controllers/users");

usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;
