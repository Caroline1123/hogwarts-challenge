import { register } from "./utils/register.js";
import { login } from "./utils/log.js";
import { retrieveSession } from "./utils/localStorage.js";
import { renderNav } from "./utils/display.js";
import { displayLobby, sendMessage, openModal } from "./utils/lobby.js";

const registerForm = document.querySelector("#signup-form");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    register(formData);
  });
}

const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    login(formData, "");
  });
}

const postForm = document.querySelector("#post-form");
if (postForm) {
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(postForm);
    sendMessage(formData);
  });
}

const session = retrieveSession();
if (session) {
  renderNav();
}

if (window.location.pathname.endsWith("lobby.html")) {
  displayLobby();
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id.startsWith("edit_")) {
    openModal(e.target.id.split("_")[1]);
  }
});
