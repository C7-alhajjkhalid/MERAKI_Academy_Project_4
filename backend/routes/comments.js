const express = require("express");
const commentsRouter = express.Router();

const {
  newComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId
} = require("../controllers/comments");

commentsRouter.post("/", newComment);
// commentsRouter.get("/", getAllComments);
commentsRouter.get("/post/:id", getCommentsByPostId);
commentsRouter.get("/:id", getCommentById);
commentsRouter.put("/:id", updateCommentById);
commentsRouter.delete("/:id", deleteCommentById);

module.exports = commentsRouter;
