const express = require("express");
const router = express.Router();
const {
  deleteMessage,
  editMessage,
  createMessage,
} = require("../controllers/messageController");

// messageRoutes
router.post("/", createMessage);
router.delete("/:id", deleteMessage);
router.patch("/:id", editMessage);

module.exports = router;
