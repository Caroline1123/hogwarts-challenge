const express = require("express");
const dbConnect = require("./database/connect");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

const app = express();
dbConnect();
const port = 3000;

app.use(express.static(path.join(__dirname, "..", "frontend", "public")));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
