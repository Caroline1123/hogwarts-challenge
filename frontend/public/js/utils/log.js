import { sanitizeInput, validateEmail } from "./validate.js";
import { startSession, closeSession } from "./localStorage.js";

const endpoint = "http://localhost:3000/api/users/login";

const login = async (data, isRegistered) => {
  let email = sanitizeInput(data.get("email"));
  let password = sanitizeInput(data.get("password"));
  if (!email || !password) {
    return "Some information is missing.";
  }
  if (!validateEmail(email)) {
    return "Invalid email address";
  }
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    console.log("User successfully logged in");
    startSession(data.foundUser);
    if (isRegistered !== "registered") {
      window.location.href = "index.html";
    }
    return;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

const logout = () => {
  closeSession();
  window.location.href = "index.html";
};

export { login, logout };
