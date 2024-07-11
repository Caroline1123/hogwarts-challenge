const closeSession = () => {
  localStorage.clear();
};

const startSession = (user) => {
  closeSession();
  localStorage.setItem("user", user._id);
};

const retrieveSession = () => {
  if (localStorage.getItem("user") === undefined) {
    return false;
  }
  return localStorage.getItem("user");
};

export { startSession, retrieveSession, closeSession };
