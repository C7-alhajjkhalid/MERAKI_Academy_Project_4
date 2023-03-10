const commentsModel = require("../models/CommentSchema");
const Post = require("../models/PostSchema");

const newComment = async (req, res) => {
  try {
    const { content, post } = req.body;
    const userId = req.userId;
    const postExists = await Post.exists({ _id: post });
    if (!postExists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = new commentsModel({
      content,
      post,
      author: userId,
    });
    const savedComment = await comment.save();

    await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    );

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(401).json(err);
  }
};

// const getAllComments = (req, res) => {

// };

const getCommentById = (req, res) => {
  const commentId = req.params.id;
  commentsModel
    .findById(commentId)
    .populate("post", "name")
    .populate("author", "username")
    .exec()
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

const updateCommentById = (req, res) => {
  let commentId = req.params.id;
  const newData = req.body;
  Object.keys(newData).forEach((key) => {
    newData[key] == "" && delete newData[key];
  });
  commentsModel
    .findByIdAndUpdate({ _id: commentId }, req.body, { new: true })
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};
const deleteCommentById = (req, res) => {
  let commentId = req.params.id;
  commentsModel
    .findByIdAndRemove(commentId)
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};
const getCommentsByPostId = (req, res) => {};

module.exports = {
  newComment,
  // getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId,
};
