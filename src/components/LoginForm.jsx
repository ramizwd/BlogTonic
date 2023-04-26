import React from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';

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
