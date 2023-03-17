const express = require("express");
const subredditRouter = express.Router();
const {
  newSubreddit,
  getSubscribedSubreddits,
  getAllSubreddits,
  getSubredditById,
  deleteSubredditById,
  updateSubredditById,
  subscribeToSubreddit,
} = require("../controllers/subreddit");
const authentication = require("../middleware/authentication");

subredditRouter.post("/", authentication, newSubreddit);
subredditRouter.get("/subscribed", getSubscribedSubreddits);
subredditRouter.get("/all", getAllSubreddits);
subredditRouter.get("/:id", getSubredditById);
subredditRouter.delete("/:id", deleteSubredditById);
subredditRouter.put("/:id", updateSubredditById);
subredditRouter.post("/subscribe/:id", authentication, subscribeToSubreddit);

module.exports = subredditRouter;
