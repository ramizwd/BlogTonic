import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, Tab, Tabs, Typography } from '@mui/material';
import { Post } from '../components/Post';
import { GET_LIKED_POSTS_BY_USER_ID, GET_POSTS, GET_POSTS_BY_AUTHOR_ID } from '../graphql/queries';
import { useAuth } from '../hooks/useAuth';
import { GRAPHQL_API } from '../utils/constants';
import { fetchGql } from '../graphql/fetch';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const [posts, setPosts] = useState(null);
  const [likedPosts, setLikedPosts] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  const { user } = useAuth();

  const navigate = useNavigate();

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

  //  get all posts and filter user's liked posts
  const getPosts = async () => {
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

  const createBlogPage = () => {
    navigate('/create-post');
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getAuthorPosts();
    getPosts();
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
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {user.user.username}
        </Typography>
        <Button variant="outlined" onClick={editProfilePage}>
          Edit Profile
        </Button>
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
