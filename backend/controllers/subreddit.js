const subredditModel = require("../models/SubredditSchema");
const Posts = require("../models/PostSchema");

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

// const getSubredditById = (req, res) => {
//   const subId =
// };

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

module.exports = {
  newSubreddit,
  getSubscribedSubreddits,
  getAllSubreddits,
  // getSubredditById,
  deleteSubredditById,
  updateSubredditById,
};
