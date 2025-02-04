import NavBar from './components/ui/NavBar';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import PageNotFound from './components/pages/PageNotFound';
import Footer from './components/ui/Footer';
import AllGames from './components/pages/AllGames';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCheck } from './redux/thunkActions';
import AdminPage from './components/pages/AdminPage';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import {
  Box,
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import type { State } from './redux/types';
import GamePage from './components/pages/GamePage';
import LobbyPage from './components/pages/LobbyPage';
import './app.css';
import UserProfilePage from './components/pages/UserProfilePage';

export default function App() {
  const loading = useSelector((state: State) => state.appSlice.loading);
  const localMode = JSON.parse(localStorage.getItem('darkMode'));

  const dispatch = useDispatch();

  useEffect(() => {
    if (localMode === null) {
      localStorage.setItem('darkMode', JSON.stringify(false));
    }
    dispatch<any>(fetchUserCheck());
   
  }, []);

  const [darkMode, setDarkMode] = useState(localMode);

  type MyTheme = {
    palette: {
      mode: 'light' | 'dark';
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
    };
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#CE13EF',
      },
    },
  }) satisfies MyTheme;

  const handleToggle = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app" style={{ height: 'auto', paddingBottom: '8vh' }}>
        <NavBar darkMode={darkMode} handleToggle={handleToggle} />
        {loading ? (
          <Box
            sx={{
              backgroundColor: 'primary.main',
              height: '85vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Routes>
            <Route path="/lobby/:id" element={<LobbyPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/games" element={<AllGames />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/profile/:id" element={<UserProfilePage />} />
            <Route
              path="/adminka"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
