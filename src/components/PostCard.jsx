import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  const theme = useTheme();
  const { darkMode } = useThemeContext();

  return (
    <Link to={`/post/${$id}`} style={{ textDecoration: 'none' }}>
      <Box
        className="post-card"
        bgcolor={darkMode ? theme.palette.background.default : '#f9f9f9'}
        borderRadius="12px"
        p={3}
        boxShadow={3}
        mb={3}
        sx={{
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9)',
          },
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="featured-image"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              objectFit: 'cover',
            }}
          />
        </Box>

        <Typography
          variant="h6"
          fontWeight="bold"
          color={darkMode ? theme.palette.text.primary : theme.palette.text.secondary}
          gutterBottom
        >
          {title}
        </Typography>
      </Box>
    </Link>
  );
}

export default PostCard;
