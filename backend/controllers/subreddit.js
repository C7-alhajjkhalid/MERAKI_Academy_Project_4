const subredditModel = require("../models/SubredditSchema");
const Posts = require("../models/PostSchema");
const User = require("../models/UserSchema");

const newSubreddit = (req, res) => {
  const { name, description } = req.body;
  const creator = req.userId;
  const newSub = new subredditModel({ name, description, creator });
  newSub
    .save()
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((err) => {
      throw err;
    });
};

const getSubscribedSubreddits = (req, res) => {
  const userId = req.userId;

  subredditModel
    .find({ members: userId })
    .select("name description")
    .populate("creator", "username")
    .exec()
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

const getAllSubreddits = (req, res) => {
  subredditModel
    .find()
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

const getSubredditById = (req, res) => {
  const subId = req.params.id;
  console.log("hello world");
  Posts.find({ subreddit: subId })
    .populate("subreddit")

    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      throw err;
    });
};

//needs update
const deleteSubredditById = (req, res) => {
  let subId = req.params.id;
  subredditModel
    .findByIdAndRemove(subId)
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

//needs update
const updateSubredditById = (req, res) => {
  let subId = req.params.id;
  const newData = req.body;
  Object.keys(newData).forEach((key) => {
    newData[key] == "" && delete newData[key];
  });
  subredditModel
    .findByIdAndUpdate({ _id: subId }, req.body, { new: true })
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((err) => {
      res.status(401).json({ success: false, err });
    });
};

const subscribeToSubreddit = async (req, res, next) => {
  const subredditId = req.params.id;

  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const subreddit = await subredditModel.findById(subredditId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!subreddit) {
      return res.status(404).json({ message: "Subreddit not found" });
    }

    if (user.subreddits.includes(subredditId)) {
      return res
        .status(409)
        .json({ message: "User is already subscribed to this subreddit" });
    }

    user.subreddits.push(subredditId);
    subreddit.members.push(user._id);

    await user.save();
    await subreddit.save();

    res.status(200).json({
      message: "User has subscribed to the subreddit",
      user,
      subreddit,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  subscribeToSubreddit,
};

module.exports = {
  newSubreddit,
  getSubscribedSubreddits,
  getAllSubreddits,
  getSubredditById,
  deleteSubredditById,
  updateSubredditById,
  subscribeToSubreddit,
};
