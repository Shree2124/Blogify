import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: theme.shadows[3],
            mb: 4,
          }}
        >
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
          {isAuthor && (
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                gap: 1,
              }}
            >
              <Link to={`/edit-post/${post.$id}`}>
                <Button variant="contained" color="success">
                  Edit
                </Button>
              </Link>
              <Button variant="contained" color="error" onClick={deletePost}>
                Delete
              </Button>
            </Box>
          )}
        </Box>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          {post.title}
        </Typography>
        <Box
          sx={{
            typography: "body1",
            lineHeight: 1.6,
            color: theme.palette.text.primary,
            "& img": {
              maxWidth: "100%",
              borderRadius: theme.shape.borderRadius,
            },
          }}
        >
          {parse(post.content)}
        </Box>
      </Container>
    </Box>
  ) : null;
}
