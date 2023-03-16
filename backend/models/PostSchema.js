const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Post", postSchema);
