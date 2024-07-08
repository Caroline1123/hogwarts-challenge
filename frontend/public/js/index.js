import { register } from "./register.js";
import { login } from "./login.js";

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
    login(formData);
  });
}
