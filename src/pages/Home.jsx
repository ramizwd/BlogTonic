import React, { useEffect, useState } from 'react';
import { GET_POSTS } from '../graphql/queries';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API, MAX_CONTENT_LENGTH } from '../utils/constants';
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
    return <Typography>Loading...</Typography>;
  }

  const truncateContent = (content) => {
    if (content.length <= MAX_CONTENT_LENGTH) {
      return content;
    }
    return `${content.substring(0, MAX_CONTENT_LENGTH)}...`;
  };

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {posts.map((post) => (
            <Box key={post.id} sx={{ paddingBottom: '1rem' }}>
              <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    width: '100%',
                    height: 'fit-content',
                    maxHeight: '10rem',
                    border: '1px solid #ddd',
                    boxShadow: 'none',
                    minWidth: '40rem',
                    '&:hover': {
                      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                    },
                    borderRadius: '0.5rem',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                        by {post.author.username}
                      </Typography>
                      <Typography variant="subtitle2">{new Date(post.createdAt).toLocaleDateString()}</Typography>
                    </Box>
                    <Typography variant="h5" sx={{ marginTop: '.5rem', textAlign: 'left' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '.5rem', textAlign: 'left', color: '#888' }}>
                      {truncateContent(post.content)}
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
