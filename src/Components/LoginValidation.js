
export const LoginValidation = (email, password) => {
    const errors = {};
  
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  