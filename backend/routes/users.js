const express = require("express");
const usersRouter = express.Router();
const { register, login, subscribeNewSub } = require("../controllers/users");
const authenication = require("../middleware/authentication");

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/:id", authenication, subscribeNewSub);

module.exports = usersRouter;
