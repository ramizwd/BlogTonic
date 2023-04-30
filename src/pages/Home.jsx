import React, { useEffect, useState } from 'react';
import { GET_POSTS } from '../graphql/queries';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API, MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '../utils/constants';
import { Container, Typography, Card, CardContent, Button, Box, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { truncateText } from '../utils/truncate';

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
              <Link to={`/post/${post.id}`}>
                <Card
                  sx={{
                    width: '40rem',
                    height: 'fit-content',
                    maxHeight: '12rem',
                    border: '1px solid #ddd',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                    },
                    borderRadius: '0.5rem',
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ textAlign: 'left' }}>
                      {truncateText(post.title, MAX_TITLE_LENGTH)}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                      by {post.author.username}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'left' }}>
                      {truncateText(post.content, MAX_CONTENT_LENGTH)}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ textAlign: 'right', marginTop: '1rem' }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};
