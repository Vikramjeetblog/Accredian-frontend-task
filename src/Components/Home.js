import React from 'react';
import { Box, Typography } from '@mui/material';
import { borderRadius } from '@mui/system';

const Home = () => {
  return (
    <Box
      sx={{
        height: '300px', 
        width: '500px',  
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        color: 'primary',
        borderRadius:"8px"
      }}
    >
      <Typography variant="h4">Home</Typography>
    </Box>
  );
};

export default Home;
