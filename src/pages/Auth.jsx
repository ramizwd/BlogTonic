import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { LOGIN_USER, REGISTER_USER } from '../graphql/mutations';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API } from '../utils/constants';
import { useForm } from '../hooks/useForm';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const auth = useAuth();
  const navigate = useNavigate();

  const registerForm = useForm({ email: '', username: '', password: '' }, async (values) => {
    const userData = {
      user: { email: values.email, username: values.username, password: values.password },
    };

    try {
      await fetchGql(GRAPHQL_API, REGISTER_USER, userData);
      toast.success('User registered successfully!');
      setIsLogin(true);
    } catch (error) {
      toast.error('Something went wrong! Please check your credentials.');
      console.error('Error: ', error);
    }
  });

  const loginForm = useForm({ username: '', password: '' }, async (values) => {
    const lowerCase = values.username.toLowerCase();
    const userData = {
      credentials: { username: lowerCase, password: values.password },
    };

    try {
      const user = await fetchGql(GRAPHQL_API, LOGIN_USER, userData);

      if (user) {
        toast.success('User logged in successfully!');
        sessionStorage.setItem('user', JSON.stringify(user.login));
        auth.login(user.login);
        navigate('/', { replace: true });
      }
    } catch (error) {
      toast.error('Something went wrong! Please check your credentials.');
      console.error('Error: ', error);
    }
  });

  useEffect(() => {
    const userStr = sessionStorage.getItem('user');
    const user = JSON.parse(userStr);

    if (user) {
      auth.login(user);
      navigate('/', { replace: true });
    }

    registerForm.reset();
    loginForm.reset();
  }, [isLogin]);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Card elevation={4}>
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
