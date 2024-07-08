import { sanitizeInput, validateEmail } from "./utils/validate.js";

const endpoint = "http://localhost:3000/api/users/login";

const login = (data) => {
  let email = sanitizeInput(data.get("email"));
  let password = sanitizeInput(data.get("password"));
  if (email && password) {
  }
  if (!validateEmail(email)) {
    return "Invalid email address";
  } else {
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("User successfully logged in", data.message);
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
      });
  }
};

export { login };
