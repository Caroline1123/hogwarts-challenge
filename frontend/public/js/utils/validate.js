const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeInput = (input) => {
  return input.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  const formattedDate = `${day}/${month}/${year}`;

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  if (isToday) {
    return `Today ${formattedTime}`;
  } else {
    return `${formattedDate} ${formattedTime}`;
  }
};

export { validateEmail, sanitizeInput, formatDate };
