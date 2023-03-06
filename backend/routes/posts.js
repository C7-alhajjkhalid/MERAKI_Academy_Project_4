const express = require("express");
const postsRouter = express.Router();

postsRouter.post("/addPost");
postsRouter.get("/allPosts");
postsRouter.get("/subscribedSubreddits");
postsRouter.get("/:id");
postsRouter.delete("/:id");
postsRouter.put("/:id");

module.exports = postsRouter;
