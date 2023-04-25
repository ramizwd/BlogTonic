import { TextField, Button, Box, Stack } from '@mui/material';
import React from 'react';

export const RegisterForm = ({ values, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <p>Username can only contain alphanumeric characters and between 3 and 20 characters long</p>
      <p>Password must be at least 6 characters long</p>
      <Box>
        <Stack spacing={2}>
          <TextField name="email" label="Email" type="email" value={values.email} onChange={handleChange} />
          <TextField name="username" label="Username" value={values.username} onChange={handleChange} />
          <TextField name="password" label="Password" type="password" value={values.password} onChange={handleChange} />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default RegisterForm;
