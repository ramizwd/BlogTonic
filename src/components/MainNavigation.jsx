import React, { useContext } from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, Menu, MenuItem, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MainNavigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');

  const handleClick = (event) => {
    !token ? navigate('/auth', { replace: true }) : setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none', backgroundColor: 'white', borderBottom: '1px solid lightgray' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Link to="/home">BLOGTONIC</Link>
        </Typography>
        <div className="nav-right">
          <Button onClick={handleClick} sx={{ mr: 2 }}>
            {token ? userId : 'LOGIN'}
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
            <MenuItem onClick={handleClose}>{<Button onClick={() => logout()}>LOGOUT</Button>}</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
