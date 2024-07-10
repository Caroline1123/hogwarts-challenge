const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_CONNECT);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
