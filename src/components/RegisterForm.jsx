import { TextField, Button, Box, Stack, Typography } from '@mui/material';
import React from 'react';

export const RegisterForm = ({ values, handleChange, handleSubmit, ButtonText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Typography gutterBottom>
        Username can only contain alphanumeric characters and between 3 and 20 characters long{' '}
      </Typography>
      <Typography gutterBottom> Password must be at least 6 characters long </Typography>
      <Box>
        <Stack spacing={2}>
          <TextField name="email" label="Email" type="email" required value={values.email} onChange={handleChange} />
          <TextField name="username" label="Username" required value={values.username} onChange={handleChange} />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" type="submit">
            {ButtonText}
          </Button>
        </Stack>
      </Box>
    </form>
  );
};
