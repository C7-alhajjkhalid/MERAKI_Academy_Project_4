const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20,
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 5000,
  },
  subreddit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subreddit",
    required: true,
  },
  upvotes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  downvotes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.Model("Post", postSchema);
