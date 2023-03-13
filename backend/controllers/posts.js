const postsModel = require("../models/PostSchema");
const subredditModel = require("../models/SubredditSchema");
const usersModel = require("../models/UserSchema");

const newPost = (req, res) => {
  const { title, content, subreddit } = req.body;
  const author = req.userId;
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
    .populate("subreddit")
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
  console.log("h")
  const postId = req.params.id;
  console.log(postId);
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

const getSubscribedPosts = async (req, res) => {
  const userId = req.userId;
  const userSubreddits = await usersModel.findById(userId).select("subreddits");
  console.log(userSubreddits);

  postsModel
    .find()
    .where({ subreddit: userSubreddits.subreddits })
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
  getSubscribedPosts,
};
