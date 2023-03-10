const postsModel = require("../models/PostSchema");

const newPost = (req, res) => {
  const { title, content, subreddit, author } = req.body;
  const newPost = new postsModel({ title, content, subreddit, author });
  newPost
    .save()
    .then((result) => {
      res.status(201).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
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
const deletePostById = (req, res) => {
  let subId = req.params.id;
  postsModel
    .findByIdAndRemove(subId)
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

const updatePostById = (req, res) => {
  let postId = req.params.id;
  const newData = req.body;
  Object.keys(newData).forEach((key) => {
    newData[key] == "" && delete newData[key];
  });
  subredditModel
    .findByIdAndUpdate({ _id: postId }, req.body, { new: true })
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

module.exports = {
  newPost,
  getAllPosts,
  getPostsBySubId,
  getPostById,
  deletePostById,
  updatePostById,
};
