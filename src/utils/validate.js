export const checkValidData = (email, password, name) => {
  // Email validation
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

  // Password must be at least 6 characters, include at least one letter and one number
  const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password);

  // Name validation: only letters and spaces, at least 2 characters
  const isNameValid = name ? /^[a-zA-Z\s]{2,}$/.test(name) : true;

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password must be at least 6 characters and include at least one letter and one number";
  if (!isNameValid) return "Name is not valid";

  return null;
};
