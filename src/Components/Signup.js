
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { SignupValidation } from './SignupValidation';
import '../App.css';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',  
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const validationErrors = SignupValidation(details.name, details.email, details.password, details.confirmPassword);
    setErrors(validationErrors);

    // If there are no errors, proceed with signup logic
    if (Object.keys(validationErrors).every(key => errors[key] === "")) {
      try {
        const response = await axios.post("http://localhost:5000/signup", details);
        console.log('Signup successful:', response.data);
        // Redirect to login after successful signup using useNavigate
        navigate('/');
      } catch (error) {
        console.error('Signup error:', error.response?.data?.error || 'Unknown error');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box className="Custom-box">
          <Typography variant="h5" style={{ textAlign: 'center' }}> Sign Up</Typography>
          <hr style={{ width: '90%', margin: '10px auto', color: 'black' }} />

          <InputLabel htmlFor="name">Name</InputLabel>
          <TextField
            onChange={handleChange}
            type="text"
            name="name"
            value={details.name}
            id="name"
            label="Name"
            variant="outlined"
            className="custom-textfield"
            margin="normal"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            onChange={handleChange}
            type="email"
            name="email"
            value={details.email}
            id="email"
            label="Email"
            variant="outlined"
            className="custom-textfield"
            margin="normal"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField
            onChange={handleChange}
            name="password"
            value={details.password}
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            className="custom-textfield"
            margin="normal"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <TextField
            onChange={handleChange}
            name="confirmPassword"
            value={details.confirmPassword}
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            className="custom-textfield"
            margin="normal"
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

          <Button type="submit" variant="contained" color="primary">Signup</Button>

          <Link to="/" style={{ textDecoration: 'none', marginTop: '10px', color: 'blue', textAlign: 'center', display: 'block' }}>
            Already have an account? Login
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
