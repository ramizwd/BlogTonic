import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { LOGIN_USER, REGISTER_USER } from '../graphql/mutations';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API } from '../utils/constants';
import { useForm } from '../hooks/useForm';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

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
      console.log('user: ', user);
    } catch (error) {
      console.error('Error: ', error);
    }
  });

  useEffect(() => {
    registerForm.reset();
    loginForm.reset();
  }, [isLogin]);

  return (
    <div>
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
      <Button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register Page' : 'Login Page'}</Button>
    </div>
  );
};

export { AuthPage };
