const express = require("express");
const commentsRouter = express.Router();

commentsRouter.post("/");
commentsRouter.get("/");
commentsRouter.get("/:id");
commentsRouter.put("/:id");
commentsRouter.delete("/:id");

module.exports = commentsRouter;
