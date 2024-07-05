const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/crypto");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    let user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = { getUsers, createUser };
