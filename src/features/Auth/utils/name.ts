export const validateName = (name: string) => {
  if (!name) {
    return 'Please enter your name';
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (name.length > 50) {
    return 'Name must be at most 50 characters long';
  }
  const re = /^[a-z\sA-Z]+$/;
  if (!re.test(name)) {
    return 'Name must contain only letters';
  }
};
