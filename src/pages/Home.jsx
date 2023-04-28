import React, { useEffect, useState } from 'react';
import { GET_POSTS } from '../graphql/queries';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API, MAX_CONTENT_LENGTH } from '../utils/constants';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    try {
      const posts = await fetchGql(GRAPHQL_API, GET_POSTS);
      setPosts(posts.posts);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (posts === null) {
    return <Typography>Loading...</Typography>;
  }

  const truncateContent = (content) => {
    if (content.length <= MAX_CONTENT_LENGTH) {
      return content;
    }
    return `${content.substring(0, MAX_CONTENT_LENGTH)}...`;
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
        <div>
          <Typography sx={{ paddingBottom: '2rem' }} variant="h5">
            No blogs yet!
          </Typography>
          <Button variant="contained">Create a Blog</Button>
        </div>
      ) : (
        <Grid container spacing={2} direction="column">
          {posts.map((post) => (
            <Grid item key={post.id}>
              <Card
                sx={{
                  width: '100%',
                  height: 'fit-content',
                  maxHeight: '10rem',
                  border: '1px solid #ddd',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                  },
                  borderRadius: '0.5rem',
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                    by {post.author.username}
                  </Typography>
                  <Typography variant="h5" sx={{ marginTop: '.5rem', textAlign: 'left' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: '.5rem', textAlign: 'left', color: '#888' }}>
                    {truncateContent(post.content)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
