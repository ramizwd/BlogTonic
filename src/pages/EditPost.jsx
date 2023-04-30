import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPostForm } from '../components/PostForm';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { toast } from 'react-hot-toast';
import { GRAPHQL_API } from '../utils/constants';
import { UPDATE_POST } from '../graphql/mutations';
import { fetchGql } from '../graphql/fetch';
import { GET_POST_BY_ID } from '../graphql/queries';

export const EditPostPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { postId } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();

  const updateForm = useForm({ title: '', content: '' }, async (values) => {
    const updateData = {
      updatePost: {
        title: values.title,
        content: values.content,
        id: postId,
      },
    };

    try {
      const updatedPost = await fetchGql(GRAPHQL_API, UPDATE_POST, updateData, user.token);

      if (updatedPost) {
        toast.success('Blog Updated!');
        navigate(`/post/${postId}`, { replace: true });
        updateForm.reset();
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Error: ', error);
    }
  });

  const getPost = async (id) => {
    try {
      setIsLoading(true);
      const fetchedPost = await fetchGql(GRAPHQL_API, GET_POST_BY_ID, {
        postByIdId: id,
      });

      if (fetchedPost) {
        updateForm.setValues({ title: fetchedPost.postById.title, content: fetchedPost.postById.content });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Fetching post failed!');
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getPost(postId);
  }, [postId]);

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <div>
      <h1>Update blog post</h1>
      <BlogPostForm
        values={updateForm.values}
        handleChange={updateForm.handleChange}
        handleSubmit={updateForm.handleSubmit}
      />
    </div>
  );
};
