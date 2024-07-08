const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/encrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const createUser = async (req, res) => {
  const { name, email, house, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Name already in use" });
    }
    const hashedPassword = await hashPassword(password);
    let user = new User({ name, email, house, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "Email address not in use" });
    }
    // Check PW here.
    const isMatch = await comparePassword(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const payload = {
      user: {
        id: foundUser.id,
      },
    };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });
    // Send response
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

module.exports = { getUsers, createUser, login, getUserById };
