import React, { useEffect, useState } from 'react';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API } from '../utils/constants';
import { GET_POST_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Box, Container, Typography } from '@mui/material';

export const PostDetailPage = () => {
  const [post, setPost] = useState(null);

  const { postId } = useParams();

  const getPost = async (id) => {
    try {
      const post = await fetchGql(GRAPHQL_API, GET_POST_BY_ID, {
        postByIdId: id,
      });

      console.log('Post HERE: ', post.postById);
      setPost(post.postById);
    } catch (error) {
      toast.error('Fetching post failed!');
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getPost(postId);
  }, [postId]);

  if (post === null) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ paddingTop: '4rem' }}>
        <Typography variant="h4" align="center" sx={{ textAlign: 'left' }}>
          {post.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            color: 'text.secondary',
            paddingRight: '1rem',
          }}
        >
          <Typography gutterBottom variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            by {post.author.username}
          </Typography>
          <Typography variant="subtitle2">{new Date(post.createdAt).toLocaleDateString()}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%', maxWidth: '50rem', textAlign: 'left' }}>
        <Typography variant="body1">{post.content}</Typography>
      </Box>
    </Container>
  );
};
