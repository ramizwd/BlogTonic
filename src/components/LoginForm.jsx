import { TextField, Button } from '@mui/material';
import React from 'react';

export const LoginForm = ({ values, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField name="username" label="Username" value={values.username} onChange={handleChange} />
      <TextField name="password" label="Password" type="password" value={values.password} onChange={handleChange} />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
