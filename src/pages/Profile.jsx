import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, Tab, Tabs, Typography } from '@mui/material';
import { Post } from '../components/Post';
import { GET_LIKED_POSTS_BY_USER_ID, GET_POSTS_BY_AUTHOR_ID } from '../graphql/queries';
import { useAuth } from '../hooks/useAuth';
import { GRAPHQL_API } from '../utils/constants';
import { fetchGql } from '../graphql/fetch';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DELETE_USER } from '../graphql/mutations';
import jwtDecode from 'jwt-decode';

export const ProfilePage = () => {
  const [posts, setPosts] = useState(null);
  const [likedPosts, setLikedPosts] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const decodedPayload = jwtDecode(user.token);
  const isAdmin = decodedPayload.isAdmin;

  const getAuthorPosts = async () => {
    const userData = {
      authorId: user.user.id,
    };

    try {
      const posts = await fetchGql(GRAPHQL_API, GET_POSTS_BY_AUTHOR_ID, userData);
      setPosts(posts.postsByAuthorId.reverse());
    } catch (error) {
      toast.error('Fetching posts by author failed!');
      console.error('Error: ', error);
    }
  };

  const getLikedPosts = async () => {
    const userData = {
      userId: user.user.id,
    };

    try {
      const posts = await fetchGql(GRAPHQL_API, GET_LIKED_POSTS_BY_USER_ID, userData);
      setLikedPosts(posts.postsLikedByUserId.reverse());
    } catch (error) {
      toast.error('Fetching liked posts failed!');
      console.error('Error: ', error);
    }
  };

  const editProfilePage = () => {
    navigate(`/edit-profile/${user.user.id}`);
  };

  const deleteProfile = async () => {
    try {
      const res = await fetchGql(GRAPHQL_API, DELETE_USER, null, user.token);

      if (res) {
        toast.success('User Profile Deleted!');
        logout();
        navigate('/auth', { replace: true });
      }
    } catch (error) {
      toast.error('Deleting Profile Failed!');
    }
  };

  const createBlogPage = () => {
    navigate('/create-post');
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getAuthorPosts();
    getLikedPosts();
  }, []);

  if (posts === null) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <Container
      sx={{
        width: '800px',
        paddingTop: '4rem',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box x={{ justifyContent: 'column' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            {user.user.username}
          </Typography>
          {isAdmin && (
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                backgroundColor: 'lightgray',
                borderRadius: 1,
                padding: '0.2rem',
                fontSize: '.8rem',
              }}
            >
              ADMINISTRATOR
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button sx={{ marginBottom: '.5rem' }} variant="outlined" onClick={editProfilePage}>
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: '#fc2c03',
              outline: 'none !important',
              borderColor: '#fc2c03 !important',
            }}
            onClick={deleteProfile}
          >
            Delete Profile
          </Button>
        </Box>
      </Box>
      <Box>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab sx={{ outline: 'none !important' }} label="My Posts" />
          <Tab sx={{ outline: 'none !important' }} label="Liked Posts" />
        </Tabs>
        {selectedTab === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', wordWrap: 'break-word' }}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Box key={post.id} sx={{ my: 1 }}>
                  <Post post={post} />
                </Box>
              ))
            ) : (
              <Box sx={{ my: 3 }}>
                <Typography sx={{ paddingBottom: '2rem' }} variant="body1">
                  You haven't created any blog posts yet.
                </Typography>
                <Button onClick={createBlogPage} variant="contained">
                  Create a Blog
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', wordWrap: 'break-word' }}>
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <Box key={post.id} sx={{ my: 1 }}>
                  <Post post={post} />
                </Box>
              ))
            ) : (
              <Typography sx={{ my: 3 }} variant="body1">
                You haven't liked any blog posts yet.
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};
