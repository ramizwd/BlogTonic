import React, { useContext } from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, Menu, MenuItem, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const MainNavigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('userId');

  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none', backgroundColor: 'white', borderBottom: '1px solid lightgray' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Link to="/home">BLOGTONIC</Link>
        </Typography>
        <div className="nav-right">
          <Button onClick={handleClick} sx={{ mr: 2 }}>
            {token ? user : 'LOGIN'}
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
            <MenuItem onClick={handleClose}>{token && <Button onClick={() => logout()}>LOGOUT</Button>}</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
