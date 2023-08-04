export const validateEmail = (email: string) => {
  const splitEmail = email.split('@');
  if (!splitEmail[1] || splitEmail[1].includes('fortum')) {
    return 'Please use your personal email address';
  }
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? '' : 'Please enter a valid email address';
};
