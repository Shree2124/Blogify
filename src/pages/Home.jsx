import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { CircularProgress, Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../context/ThemeContext";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const { darkMode } = useThemeContext();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts();
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="70vh"
                    bgcolor={darkMode ? theme.palette.background.default : "#f9f9f9"}
                >
                    <CircularProgress color="primary" />
                </Box>
            </Container>
        );
    }

    if (posts.length === 0) {
        return (
            <Container>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="70vh"
                    bgcolor={darkMode ? theme.palette.background.default : "#f9f9f9"}
                >
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        textAlign="center"
                        color={theme.palette.text.secondary}
                    >
                        No posts available
                    </Typography>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        color={theme.palette.text.secondary}
                        mt={1}
                    >
                        Please log in to read posts.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box py={4}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={3}
                    textAlign="center"
                    color={theme.palette.text.primary}
                >
                    Latest Posts
                </Typography>
                <Grid container spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post.$id} item xs={12} sm={6} md={4} lg={3}>
                            <PostCard {...post} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default Home;
