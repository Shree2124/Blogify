import { useState, useEffect } from 'react';
import { Container, Grid, Box, CircularProgress, Typography } from '@mui/material';
import appwriteService from "../appwrite/config";
import PostCard from '../components/PostCard';
import { useThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useThemeContext();
  const theme = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts([]);
        if (response) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
        bgcolor={darkMode ? theme.palette.background.default : theme.palette.grey[200]}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      py={8}
      bgcolor={darkMode ? theme.palette.background.default : theme.palette.grey[200]}
    >
      <Container>
        {posts.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5" fontWeight="bold" color="textSecondary">
              No Posts Available
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={post?.$id}>
                <PostCard {...post} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default AllPosts;
