const express = require("express");
const postsRouter = express.Router();
const {
  newPost,
  getAllPosts,
  getPostsBySubId,
  getPostById,
  deletePostById,
  updatePostById,
  getSubscribedPosts,
} = require("../controllers/posts");
const authentication = require("../middleware/authentication");

postsRouter.post("/", authentication, newPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/subscribed", authentication, getSubscribedPosts);
postsRouter.get("/:subId", authentication, getPostsBySubId);
postsRouter.get("/find/:id", getPostById);
postsRouter.delete("/:id", deletePostById);
postsRouter.put("/:id", updatePostById);

module.exports = postsRouter;
