import React from 'react';
import { Button, TextField } from '@mui/material';

export const BlogPostForm = ({ values, handleChange, handleSubmit }) => {
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    margin: '0 auto',
    marginTop: 40,
  };

  const textFieldStyle = {
    marginBottom: 20,
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={handleChange}
        variant="standard"
        style={textFieldStyle}
        required
      />
      <TextField
        name="content"
        label="Content"
        value={values.content}
        onChange={handleChange}
        variant="outlined"
        style={textFieldStyle}
        multiline
        rows={15}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};
