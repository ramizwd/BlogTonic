import React, { useEffect, useState } from 'react';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API } from '../utils/constants';
import { GET_POST_BY_ID } from '../graphql/queries';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { postId } = useParams();
  const { user } = useAuth();

  const navigator = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getPost = async (id) => {
    try {
      const post = await fetchGql(GRAPHQL_API, GET_POST_BY_ID, {
        postByIdId: id,
      });
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" align="center" sx={{ textAlign: 'left' }}>
            {post.title}
          </Typography>
          {user && user.user.id === post.author.id && (
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigator(`/edit-post/${postId}`);
                  }}
                >
                  Edit
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
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
      <Box sx={{ width: '50rem', textAlign: 'left' }}>
        <Typography variant="body1">{post.content}</Typography>
      </Box>
    </Container>
  );
};
