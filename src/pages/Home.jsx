import React, { useEffect, useState } from 'react';
import { GET_POSTS } from '../graphql/queries';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API } from '../utils/constants';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Post } from '../components/Post';

export const HomePage = () => {
  const [posts, setPosts] = useState(null);

  const navigator = useNavigate();

  const getPosts = async () => {
    try {
      const posts = await fetchGql(GRAPHQL_API, GET_POSTS);
      setPosts(posts.posts.reverse());
    } catch (error) {
      toast.error('Fetching posts failed!');
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (posts === null) {
    return <CircularProgress color="inherit" />;
  }

  const createBlogPage = () => {
    navigator('/create-post');
  };

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
      {posts.length === 0 ? (
        <Box>
          <Typography sx={{ paddingBottom: '2rem' }} variant="h5">
            No blogs yet!
          </Typography>
          <Button onClick={createBlogPage} variant="contained">
            Create a Blog
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', wordWrap: 'break-word' }}>
          {posts.map((post) => (
            <Box key={post.id} sx={{ marginBottom: '1rem' }}>
              <Post post={post} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};
