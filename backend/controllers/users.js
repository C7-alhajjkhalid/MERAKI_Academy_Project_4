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
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Account created successfully",
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "An error occured",
        success: false,
        err,
      });
    });
};

const login = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();

    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or Password" });
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      return res.status(401).json({ error: "Invalid email or Password" });
    }

    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };
    const options = {
      expiresIn: "60m",
    };

    const token = jwt.sign(payload, process.env.SECRET, options);

    res.status(201).json({
      success: true,
      message: "logged in successfully",
      token: token,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
