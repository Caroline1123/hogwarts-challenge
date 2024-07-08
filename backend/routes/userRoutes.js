const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  login,
  getUserById,
} = require("../controllers/userController");

// Gets all the users
router.get("/", getUsers);
// gets a single user based on their ID
router.get("/:id", getUserById);
// Logs in a user
router.post("/login", login);
// Registers a user
router.post("/", createUser);

module.exports = router;
