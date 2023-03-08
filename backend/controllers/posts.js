const postsModel = require("../models/PostSchema");

const newPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = postsModel({ title, content });
  newPost
    .save()
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((err) => {
      throw err;
    });
};
const getAllPosts = (req, res) => {
  postsModel
    .find()
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

const getPostsBySubId = (req, res) => {
  const subId = req.params.subId;
  postsModel
    .find({ subreddit: subId })
    .populate("author", "username")
    .exec()
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

const getPostById = (req, res) => {
  const postId = req.params.id;
  postsModel
    .findById(postId)
    .populate("subreddit", "name")
    .populate("author", "username")
    .populate("upvotes", "username")
    .populate("downvotes", "username")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "username",
      },
    })
    .exec()
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};
const deletePostById = (req, res) => {};
const updatePostById = (req, res) => {};

module.exports = {
  newPost,
  getAllPosts,
  getPostsBySubId,
  getPostById,
  deletePostById,
  updatePostById,
};
