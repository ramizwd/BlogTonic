import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { Post } from '../components/Post';
import { GET_POSTS_BY_AUTHOR_ID } from '../graphql/queries';
import { useAuth } from '../hooks/useAuth';
import { GRAPHQL_API } from '../utils/constants';
import { fetchGql } from '../graphql/fetch';
import { toast } from 'react-hot-toast';

export const ProfilePage = () => {
  const [posts, setPosts] = useState(null);

  const { user } = useAuth();

  const getAuthorPosts = async () => {
    const userData = {
      authorId: user.user.id,
    };

    try {
      const posts = await fetchGql(GRAPHQL_API, GET_POSTS_BY_AUTHOR_ID, userData);
      setPosts(posts.postsByAuthorId.reverse());
    } catch (error) {
      toast.error('Fetching posts failed!');
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getAuthorPosts();
  }, []);

  if (posts === null) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <Container
      maxWidth="sm"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5rem',
        paddingBottom: '2rem',
      }}
    >
      <Typography sx={{ paddingBottom: '2rem' }} variant="h5">
        My Posts
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', wordWrap: 'break-word' }}>
        {posts.map((post) => (
          <Box key={post.id} sx={{ marginBottom: '1rem' }}>
            <Post post={post} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};
