const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { username, password, email } = req.body;
  const newUser = new usersModel({
    username,
    password,
    email,
  });
  newUser.save().then((result)=>{}).catch((err)=>{throw err})
};
