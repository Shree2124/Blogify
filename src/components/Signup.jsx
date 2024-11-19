import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";
import { useThemeContext } from "../context/ThemeContext"; // Assuming you have a ThemeContext

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const theme = useTheme();
  const { toggleTheme } = useThemeContext(); // For toggling theme, if needed

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        bgcolor: theme.palette.background.paper,
        p: 4,
        borderRadius: 2,
        boxShadow: theme.shadows[3],
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Box
          component="img"
          src="/blog.svg" 
          alt="Logo"
          sx={{ width: 70, mx: "auto" }}
        />
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
          Sign up to create an account
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: theme.palette.primary.main,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, textAlign: "center" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(create)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            variant="outlined"
            fullWidth
            {...register("name", { required: "Full name is required" })}
          />
          <TextField
            label="Email"
            placeholder="Enter your email"
            variant="outlined"
            type="email"
            fullWidth
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            variant="outlined"
            type="password"
            fullWidth
            {...register("password", { required: "Password is required" })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Create Account
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Signup;
