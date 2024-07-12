import { retrieveSession } from "./localStorage.js";
import { sanitizeInput, formatDate } from "./validate.js";

const getUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getMessage = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/message/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) {
      const data = await response.json();
      return new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

const getHouseMessages = async (house) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/message/house/${house}`,
      {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

const editMessage = async (id, newText) => {
  console.log(newText);
  try {
    const response = await fetch(`http://localhost:3000/api/message/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ content: newText }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    console.log("Message successfully updated");
    displayLobby();
    return;
  } catch (error) {
    console.log(error.message);
  }
};

const displayMessage = (message, userId, container) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  const date = new Date(message.dateCreated);
  if (userId == message.creatorId) {
    messageDiv.innerHTML = `
    <p class="message-info">
    <span class="user">You</span><span class="date">,  ${formatDate(
      date
    )}</span></p>`;
    const Btn = document.createElement("button");
    Btn.id = `edit_${message._id}`;
    Btn.textContent = "Edit";
    messageDiv.appendChild(Btn);
  } else {
    messageDiv.innerHTML = `<p class="message-info">
    <span class="user">${
      message.creatorId
    }</span><span class="date">,  ${formatDate(date)} </span>
    </p>`;
  }
  messageDiv.innerHTML += `<p class="content">${message.content}</p>`;

  container.appendChild(messageDiv);
};

const displayLobby = async () => {
  const userId = retrieveSession();
  const lobby = document.querySelector(".lobby");
  lobby.innerHTML = "";
  const user = await getUser(userId);
  let messages = await getHouseMessages(user.house);
  for (let message of messages) {
    displayMessage(message, user._id, lobby);
  }
  lobby.scrollTop = lobby.scrollHeight;
};

const sendMessage = async (data) => {
  const creatorId = retrieveSession();
  const content = sanitizeInput(data.get("content"));
  if (!content) {
    console.log("Please fill out all fields");
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/api/message", {
      method: "POST",
      body: JSON.stringify({ content, creatorId }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    // const textarea = document.getElementById("#content");
    // textarea.textContent = "";
    displayLobby();
    const contentInput = document.querySelector("#content");
    contentInput.value = "";
    return;
  } catch (err) {
    console.error("Message not sent:", err.message);
  }
};

const openModal = async (id) => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  const editModal = document.createElement("div");
  editModal.classList.add("edit-modal");
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-modal");
  closeBtn.innerText = "X";
  const textContent = document.createElement("textarea");
  textContent.id = "new-content";
  const message = await getMessage(id);
  textContent.innerText = message.content;
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  document.body.appendChild(modalContainer);
  modalContainer.appendChild(editModal);
  editModal.appendChild(closeBtn);
  editModal.appendChild(textContent);
  editModal.appendChild(saveBtn);

  closeBtn.addEventListener("click", () => {
    modalContainer.remove();
  });

  saveBtn.addEventListener("click", () => {
    let newText = textContent.value;
    if (newText) {
      newText = sanitizeInput(newText);
      editMessage(id, newText);
    } else {
      console.log("new content not found or does not exist");
    }
    modalContainer.remove();
  });
};

export { displayLobby, sendMessage, openModal };
