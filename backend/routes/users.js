const express = require("express");
const usersRouter = express.Router();
const { register, login } = require("../controllers/users");

usersRouter.post("/register", register);
usersRouter.get("/login", login);

module.exports = usersRouter;
