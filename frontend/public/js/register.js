const endpoint = "http://localhost:3000/api/users";

const register = (data) => {
  let name = data.get("name");
  let email = data.get("email");
  let password = data.get("password");
  let confirmPassword = data.get("confirm-password");
  if (password == confirmPassword) {
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
};

export { register };
