const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.json("token required");
    }

    const token = req.headers.authorization.split(" ").pop();

    const decryptedToken = jwt.verify(token, process.env.SECRET);

    req.userId = decryptedToken.userId;
    req.username = decryptedToken.username;
    req.subreddits = decryptedToken.subreddits;
    

    next();
  } catch (err) {
    res.status(401).json({ error: "authentication failed" });
  }
};

module.exports = authentication;
