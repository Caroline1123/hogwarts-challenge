const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeInput = (input) => {
  // Trim whitespace and escape potentially harmful characters
  return input.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export { validateEmail, sanitizeInput };
