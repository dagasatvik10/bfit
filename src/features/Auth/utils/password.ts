export const validatePassword = (password: string) => {
  // Password must contain at least 6 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number.
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{6,}$/;
  return re.test(password)
    ? ''
    : 'Password must contain at least 6 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number.';
};
