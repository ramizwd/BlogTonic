import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Menu, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API } from '../utils/constants';
import { GET_POST_BY_ID } from '../graphql/queries';
import { DELETE_POST } from '../graphql/mutations';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { postId } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();

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

  const deletePost = async (id) => {
    try {
      const deleteData = {
        deletePostId: id,
      };

      const res = await fetchGql(GRAPHQL_API, DELETE_POST, deleteData, user.token);

      if (res) {
        handleMenuClose();
        toast.success(`Blog deleted with ID ${res.deletePost.id}`);
        navigate(`/`, { replace: true });
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getPost(postId);
  }, [postId]);

  if (post === null) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: '4rem',
        textAlign: 'left',
        wordWrap: 'break-word',
        width: '800px',
      }}
    >
      <Typography variant="h4">{post.title}</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          color: 'text.secondary',
        }}
      >
        <Typography gutterBottom variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          by {post.author.username}
        </Typography>
        <Typography variant="subtitle2">{new Date(post.createdAt).toLocaleDateString()}</Typography>
        {user && user.user.id === post.author.id && (
          <>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate(`/edit-post/${postId}`);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={() => deletePost(postId)}>Delete</MenuItem>
            </Menu>
          </>
        )}
      </Box>
      <Typography variant="body1">{post.content}</Typography>
    </Container>
  );
};
