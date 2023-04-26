import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Home
      <Button onClick={() => navigate('/auth', { replace: true })}>Auth</Button>
    </div>
  );
};
