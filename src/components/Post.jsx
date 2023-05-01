import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '../utils/constants';
import { truncateText } from '../utils/truncate';

export const Post = ({ post }) => {
  return (
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
          <Box
            variant="subtitle2"
            sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'right', marginTop: '1rem' }}
          >
            <Typography variant="subtitle2">
              {post.likes.length} {post.likes.length < 2 ? 'Like' : 'Likes'}
            </Typography>
            <Typography variant="subtitle2">{new Date(post.createdAt).toLocaleDateString()}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
