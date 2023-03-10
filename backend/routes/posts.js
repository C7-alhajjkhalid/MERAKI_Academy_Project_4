const express = require("express");
const postsRouter = express.Router();
const {
  newPost,
  getAllPosts,
  getPostsBySubId,
  getPostById,
  deletePostById,
  updatePostById,
} = require("../controllers/posts");

postsRouter.post("/", newPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/:subId", getPostsBySubId);
postsRouter.get("/:id", getPostById);
postsRouter.delete("/:id", deletePostById);
postsRouter.put("/:id", updatePostById);

module.exports = postsRouter;
