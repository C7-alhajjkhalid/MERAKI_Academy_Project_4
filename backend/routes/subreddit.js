const express = require("express");
const subredditRouter = express.Router();

subredditRouter.post("/");
subredditRouter.get("/subscribed");
subredditRouter.get("/all");
subredditRouter.get("/:id");
subredditRouter.delete("/:id");
subredditRouter.put("/:id");

module.exports = subredditRouter;
