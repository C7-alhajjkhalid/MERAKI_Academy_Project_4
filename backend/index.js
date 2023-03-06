const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const commentsRouter = require("./routes/comments");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const subredditRouter = require("./routes/subreddit");

app.use("/comments", commentsRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/subreddit", subredditRouter);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
