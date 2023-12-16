
export const SignupValidation = (name, email, password, confirmPassword) => {
    const errors = {};
  
    if (!name) {
      errors.name = 'Name is required';
    }
  
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!password) {
      errors.password = 'Password is required';
    }
  
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  };
  