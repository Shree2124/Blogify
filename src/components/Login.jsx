import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext"; 

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { darkMode } = useThemeContext(); 

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Invalid login credentials. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        bgcolor: darkMode ? "#121212" : "#f7f7f7", 
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Box
          component="img"
          src="/blog.svg" 
          alt="Logo"
          sx={{ width: 70, mx: "auto" }}
        />
        <Typography variant="h6" color="textSecondary">
          Welcome Back!
        </Typography>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(login)}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register("email", { required: true })}
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: true })}
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </form>
      <Typography align="center">
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: darkMode ? "#bb86fc" : "#1976d2" }}>
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
}

export default Login;
