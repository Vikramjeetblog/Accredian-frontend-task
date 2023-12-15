import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoginValidation } from './LoginValidation';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = LoginValidation(credentials.email, credentials.password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:5000/login', credentials);
        console.log('Login successful');
        navigate('/Home');
      } catch (error) {
        console.error('Login error:', error.response?.data?.error || 'Unknown error');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box className="Custom-box">
          <Typography variant="h5" style={{ textAlign: 'center' }}> Login</Typography>
          <hr style={{ width: '90%', margin: '10px auto', color: 'black' }} />

          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            onChange={handleChange}
            type="email"
            name="email"
            value={credentials.email}
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
            value={credentials.password}
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            className="custom-textfield"
            margin="normal"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <Button type="submit" variant="contained" color="primary">Login</Button>

          <Link to="/signup" style={{ textDecoration: 'none', marginTop: '10px', color: 'blue', textAlign: 'center', display: 'block' }}>
            Don't have an account? Sign Up
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Login;
