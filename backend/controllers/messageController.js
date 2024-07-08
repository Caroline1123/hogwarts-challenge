const Message = require("../models/messageModel");
const User = require("../models/userModel");

const editMessage = async (req, res) => {
  const { id: messageId } = req.params;
  try {
    const { title, content } = req.body;
    const result = await Message.updateOne(
      {
        _id: messageId,
      },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json({ message: "Message successfully edited." });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getMessageByID = async (req, res) => {
  const { id: messageId } = req.params;
  try {
    const message = await Message.findOne({ _id: messageId });
    if (!message) {
      return res.status(404).json({ message: "message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    console.error("Error retrieving message:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getMessagesByHouse = async (req, res) => {
  const houseName = req.params.houseName;
  try {
    const users = await User.find({ house: houseName });
    const userIds = users.map((user) => user._id);
    const messages = await Message.find({ creatorId: { $in: userIds } });
    if (!messages) {
      return res.status(201).json({ message: "No messages found" });
    }
    return res.status(201).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }
};

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

const deleteMessage = async (req, res) => {
  const { id: messageId } = req.params;
  try {
    const deletedMessage = await Message.findOneAndDelete({ _id: messageId });
    if (!deletedMessage) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    return res.status(201).json({ message: "Successfully deleted message" });
  } catch (e) {
    console.error("Error in deleteMessage:", err);
    return res
      .status(500)
      .json({ error: "Server Error", details: err.message });
  }
};

module.exports = {
  deleteMessage,
  editMessage,
  createMessage,
  getMessageByID,
  getMessagesByHouse,
};
