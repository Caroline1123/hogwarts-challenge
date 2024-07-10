import { validateEmail, sanitizeInput } from "./utils/validate.js";
import { login } from "./log.js";
import { sayWelcome, renderNav } from "./utils/display.js";

const endpoint = "http://localhost:3000/api/users";

const register = (data) => {
  let name = sanitizeInput(data.get("name"));
  let email = sanitizeInput(data.get("email"));
  let password = sanitizeInput(data.get("password"));
  let confirmPassword = sanitizeInput(data.get("confirm-password"));
  if (!name || !email || !password || !confirmPassword) {
    console.error("Some information is missing.");
    return;
  }
  if (!validateEmail(email)) {
    console.error("Invalid email address");
    return;
  }
  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return;
  }
  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const houseIndex = Math.floor(Math.random() * houses.length);
  const house = houses[houseIndex];
  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      house: house,
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
      login(data, "registered");
      renderNav();
      setTimeout(sayWelcome(name, house), 5000);
    })
    .catch((error) => {
      console.error("Error during registration:", error.message);
      return;
    });
};

export { register };
