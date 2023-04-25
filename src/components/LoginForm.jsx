import { TextField, Button, Box, Stack } from '@mui/material';
import React from 'react';

export const LoginForm = ({ values, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Stack spacing={2}>
          <TextField name="username" label="Username" value={values.username} onChange={handleChange} />
          <TextField name="password" label="Password" type="password" value={values.password} onChange={handleChange} />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default LoginForm;
