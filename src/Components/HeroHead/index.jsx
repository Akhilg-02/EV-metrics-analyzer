import React from 'react';
import { Box, Paper, Avatar, Typography } from '@mui/material';

const HeroHead = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      marginTop={2}
      //alignItems="center"
      height="60vh"
    >
      <Paper
        elevation={3}
        sx={{
          width: 450,
          p: 4,
          textAlign: 'center',
          borderRadius: '12px',
        }}
      >
        <Avatar
          alt="Profile Picture"
          src="https://via.placeholder.com/150"
          sx={{ width: 250, height: 250, margin: 'auto', mb: 2 }}
        />
        <Typography variant="h6" component="h2">
          John Doe
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={3}>
          Software Developer passionate about crafting intuitive user interfaces and exploring new tech.
        </Typography>
      </Paper>
    </Box>
  )
}

export default HeroHead