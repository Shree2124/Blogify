import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import loader from './assets/loader.svg';
import { Box } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider>
      {!loading ? (
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <main style={{ flex: 1 }}>
            <Outlet />
          </main>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <img src={loader} alt="Loading..." style={{ width: '100px', height: '100px' }} />
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
