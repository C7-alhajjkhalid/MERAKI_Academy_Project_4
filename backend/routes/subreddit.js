const express = require("express");
const subredditRouter = express.Router();
const {
  newSubreddit,
  getSubscribedSubreddits,
  getAllSubreddits,
  // getSubredditById,
  deleteSubredditById,
  updateSubredditById,
} = require("../controllers/subreddit");

subredditRouter.post("/", newSubreddit);
subredditRouter.get("/subscribed", getSubscribedSubreddits);
subredditRouter.get("/all", getAllSubreddits);
// subredditRouter.get("/:id", getSubredditById);
subredditRouter.delete("/:id", deleteSubredditById);
subredditRouter.put("/:id", updateSubredditById);

module.exports = subredditRouter;
