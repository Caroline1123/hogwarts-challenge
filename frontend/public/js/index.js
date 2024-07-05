import { register } from "./register.js";

const registerForm = document.querySelector("#signup-form");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);
  register(formData);
});
