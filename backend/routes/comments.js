const express = require("express");
const commentsRouter = express.Router();

const {
  newComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comments");

commentsRouter.post("/", newComment);
commentsRouter.get("/", getAllComments);
commentsRouter.get("/:id", getCommentById);
commentsRouter.put("/:id", updateCommentById);
commentsRouter.delete("/:id", deleteCommentById);

module.exports = commentsRouter;
