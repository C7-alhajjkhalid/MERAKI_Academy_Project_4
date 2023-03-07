const express = require("express");
const postsRouter = express.Router();
const {} = require("../controllers/posts");

postsRouter.post("/");
postsRouter.get("/");
postsRouter.get("/:subId");
postsRouter.get("/:id");
postsRouter.delete("/:id");
postsRouter.put("/:id");

module.exports = postsRouter;
