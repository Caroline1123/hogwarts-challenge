import { retrieveSession } from "./utils/localStorage.js";
import { sanitizeInput } from "./utils/validate.js";

const displayLobby = async () => {
  //   console.log(userID);
  //   const user = await
};

const sendMessage = async (data) => {
  const userID = retrieveSession();
  const title = sanitizeInput(data.get("title"));
  const content = sanitizeInput(data.get("content"));
  if (!title || !content) {
    console.log("Please fill out all fields");
    return;
  }
  try {
  } catch (err) {
    console.log(err.message);
  }
};

export { displayLobby, sendMessage };
