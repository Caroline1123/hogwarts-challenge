const express = require("express");
const router = express.Router();
const {
  deleteMessage,
  createMessage,
  editMessage,
  getMessageByID,
  getMessagesByHouse,
} = require("../controllers/messageController");

// GET routes
router.get("/:id", getMessageByID);
router.get("/house/:houseName", getMessagesByHouse);

// POST routes
router.post("/", createMessage);

// DELETE routes
router.delete("/:id", deleteMessage);

// PATCH routes
router.patch("/:id", editMessage);

module.exports = router;
