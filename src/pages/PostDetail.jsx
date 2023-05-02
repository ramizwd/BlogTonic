import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Menu, MenuItem, IconButton, CircularProgress, Button } from '@mui/material';
import { fetchGql } from '../graphql/fetch';
import { GRAPHQL_API } from '../utils/constants';
import { GET_POST_BY_ID } from '../graphql/queries';
import { DELETE_POST, LIKE_POST, UNLIKE_POST } from '../graphql/mutations';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
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
      setLikes(post.postById.likes);
      setLiked(post.postById.likes.some((like) => like === user.user.id));
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

  const likePost = async () => {
    const likeData = {
      postId: postId,
    };

    try {
      const res = await fetchGql(GRAPHQL_API, LIKE_POST, likeData, user.token);
      setLikes(res.likePost.likes);
      toast.success('Blog Added to Likes!');
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Error: ', error);
    }
  };

  const unlikePost = async () => {
    const unlikeData = {
      postId: postId,
    };

    try {
      const res = await fetchGql(GRAPHQL_API, UNLIKE_POST, unlikeData, user.token);
      setLikes(res.unlikePost.likes);
      toast.success('Blog Removed from Likes!');
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', my: 2 }}>
            by {post.author.username}
          </Typography>
          <Typography sx={{ paddingLeft: '1rem' }} variant="subtitle2">
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
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
      <Typography sx={{ my: 2 }} variant="body1">
        {post.content}
      </Typography>
      <Button
        variant="outlined"
        sx={{ color: liked ? 'green' : '', outline: 'none !important', borderColor: liked ? 'green !important' : '' }}
        onClick={() => {
          liked ? unlikePost() : likePost();
          setLiked(!liked);
        }}
      >
        {likes.length} {likes.length < 2 ? 'Like' : 'Likes'}
      </Button>
    </Container>
  );
};
