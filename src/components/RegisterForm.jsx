import { TextField, Button } from '@mui/material';
import React from 'react';

export const RegisterForm = ({ values, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <p>usernames must be min 3 char and max 20 and is numeric</p>
      <p>password must be min 6 char</p>

      <TextField name="email" label="Email" type="email" value={values.email} onChange={handleChange} />
      <TextField name="username" label="Username" value={values.username} onChange={handleChange} />
      <TextField name="password" label="Password" type="password" value={values.password} onChange={handleChange} />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
