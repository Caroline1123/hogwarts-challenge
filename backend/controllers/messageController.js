const Message = require("../models/messageModel");
const User = require("../models/userModel");

const editMessage = async (req, res) => {};

const createMessage = async (req, res) => {
  const { title, content, creatorId } = req.body;
  if (!title || !content || !creatorId) {
    return res
      .status(401)
      .json("Failed to send message, some information was missing.");
  } else {
    try {
      const existingUser = await User.findById(creatorId);
      if (!existingUser) {
        return res.status(400).json({ message: "Invalid creatorId" });
      }

      let message = new Message({ title, content, creatorId });
      await message.save();
      return res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
      console.error("Error in createMessage:", err); // Log the error
      return res
        .status(500)
        .json({ error: "Server Error", details: err.message });
    }
  }
};

const deleteMessage = async (req, res) => {};

module.exports = { deleteMessage, editMessage, createMessage };
