import React, { useEffect, useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { ADMIN_UPDATE_USER, UPDATE_USER } from '../graphql/mutations';
import { toast } from 'react-hot-toast';
import { GRAPHQL_API } from '../utils/constants';
import { GET_USER_BY_ID } from '../graphql/queries';
import { fetchGql } from '../graphql/fetch';
import { useForm } from '../hooks/useForm';
import { CircularProgress, Container } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';

export const EditProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useParams();
  const { user, logout } = useAuth();

  const editForm = useForm({ email: '', username: '', password: '' }, async (values) => {
    const updateData = {
      user: {
        email: values.email,
        username: values.username,
        password: values.password,
      },
    };

    try {
      let updatedUser = null;

      user.user.id === userId
        ? (updatedUser = await fetchGql(GRAPHQL_API, UPDATE_USER, updateData, user.token))
        : (updatedUser = await fetchGql(
            GRAPHQL_API,
            ADMIN_UPDATE_USER,
            { updateUserAsAdminId: userId, ...updateData },
            user.token
          ));

      if (updatedUser) {
        toast.success(user.user.id === userId ? updatedUser.updateUser.message : updatedUser.updateUserAsAdmin.message);
        if (user.user.id === userId) logout();
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Error: ', error);
    }
  });

  const getUser = async (id) => {
    try {
      setIsLoading(true);
      const fetchedUser = await fetchGql(GRAPHQL_API, GET_USER_BY_ID, {
        userByIdId: id,
      });

      if (fetchedUser) {
        editForm.setValues({
          email: fetchedUser.userById.email,
          username: fetchedUser.userById.username,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Fetching user failed!');
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <Container maxWidth="sm">
      <RegisterForm
        required={false}
        values={editForm.values}
        handleChange={editForm.handleChange}
        handleSubmit={editForm.handleSubmit}
        ButtonText={'save changes'}
      />
    </Container>
  );
};
