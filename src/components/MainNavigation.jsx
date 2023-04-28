import React from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, Menu, MenuItem, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const MainNavigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const userStr = sessionStorage.getItem('user');
  const user = JSON.parse(userStr);

  const handleClick = (event) => {
    !user ? navigate('/auth', { replace: true }) : setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    auth.logout();
    navigate('/auth', { replace: true });
  };

  const createBlogPage = () => {
    setAnchorEl(null);

    navigate('/create-post');
  };

  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none', backgroundColor: 'white', borderBottom: '1px solid lightgray' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Link to="/home">BLOGTONIC</Link>
        </Typography>
        <div className="nav-right">
          <Button onClick={handleClick} sx={{ mr: 2 }}>
            {user ? user.user.username : 'LOGIN'}
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={createBlogPage}>New Post</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
