export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return 'Please enter a valid email address';
  }

  const splitEmail = email.split('@');
  if (!splitEmail[1] || splitEmail[1].includes('fortum')) {
    return 'Please use your personal email address';
  }
};
