const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  login,
  getUserById,
} = require("../controllers/userController");

// GET routes
router.get("/", getUsers);
router.get("/:id", getUserById);

// POST routes
router.post("/login", login);
router.post("/", createUser);

module.exports = router;
