import React from 'react';
import { CREATE_POST } from '../graphql/mutations';
import { GRAPHQL_API } from '../utils/constants';
import { fetchGql } from '../graphql/fetch';
import { useForm } from '../hooks/useForm';
import { BlogPostForm } from '../components/PostForm';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const postForm = useForm({ title: '', content: '' }, async (values) => {
    if (!values.title || !values.content) {
      console.log('missing fields');
      return;
    }

    const postData = {
      title: values.title,
      content: values.content,
    };

    try {
      const post = await fetchGql(GRAPHQL_API, CREATE_POST, postData, user.user.token);

      if (post) {
        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  });

  return (
    <div>
      <h1>Create a new blog post</h1>
      <BlogPostForm
        values={postForm.values}
        handleChange={postForm.handleChange}
        handleSubmit={postForm.handleSubmit}
      />
    </div>
  );
};
