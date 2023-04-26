import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { LOGIN_USER, REGISTER_USER } from '../graphql/mutations';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API } from '../utils/constants';
import { useForm } from '../hooks/useForm';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const registerForm = useForm({ email: '', username: '', password: '' }, async (values) => {
    if (!values.email || !values.username || !values.password) {
      console.log('missing fields');
      return;
    }

    const userData = {
      user: { email: values.email, username: values.username, password: values.password },
    };

    try {
      const user = await fetchGql(GRAPHQL_API, REGISTER_USER, userData);
      console.log('user: ', user);
    } catch (error) {
      console.error('Error: ', error);
    }
  });

  const loginForm = useForm({ username: '', password: '' }, async (values) => {
    if (!values.username || !values.password) {
      console.log('missing fields');
      return;
    }

    const userData = {
      credentials: { username: values.username, password: values.password },
    };

    try {
      const user = await fetchGql(GRAPHQL_API, LOGIN_USER, userData);

      if (user) {
        login(user.login.token, user.login.user.id);
        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  });

  useEffect(() => {
    registerForm.reset();
    loginForm.reset();
  }, [isLogin]);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              {isLogin ? 'Login' : 'Register'}
            </Typography>
            {isLogin ? (
              <LoginForm
                values={loginForm.values}
                handleChange={loginForm.handleChange}
                handleSubmit={loginForm.handleSubmit}
              />
            ) : (
              <RegisterForm
                values={registerForm.values}
                handleChange={registerForm.handleChange}
                handleSubmit={registerForm.handleSubmit}
              />
            )}
            <Box mt={2} textAlign="center">
              <Link variant="text" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create an account' : 'Already have an account? Login'}
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
