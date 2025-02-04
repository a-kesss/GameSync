import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSignup, setIsOpened } from '../../redux/appSlice';
import ModalAuth from './ModalAuth.tsx';
import { SetStateAction, useState } from 'react';
import { fetchUserLogout } from '../../redux/thunkActions.ts';
import type { State } from '../../redux/types.ts';
import imglight from '../../public/logolight.png';
import imgdark from '../../public/logodark.png';
import { useTheme } from '@emotion/react';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';

type PropsTypes = {
  darkMode: boolean;
  handleToggle: SetStateAction<boolean>;
};

const Navbar = ({ darkMode, handleToggle }: PropsTypes) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.appSlice.user);

  //Определение типа модалки
  const handleOpenLogin = () => {
    dispatch(setIsOpened(true));
    dispatch(setIsSignup(true));
  };
  const handleOpenSignin = () => {
    dispatch(setIsOpened(true));
    dispatch(setIsSignup(false));
  };
  //

  const handleLogout = async () => {
    await dispatch<any>(fetchUserLogout());
    navigate('/');
  };

  const navigateToProfile = () => {
    handleClose(); // Закрытие меню
    navigate('/profile'); // Перейти к профилю
  };
  const navigateToAdmin = () => {
    handleClose(); // Закрытие меню
    navigate('/adminka'); // Перейти к профилю
  };

  //Открытие и закрытие меню
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  return (
    <>
      <AppBar style={{ height: '8vh', minHeight: '8vh' }} position="static">
        <>
          <Toolbar
            sx={{
              height: '8vh',
              minHeight: '80px',
              display: 'flex',
              bgcolor: 'black',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Avatar src={theme.palette.mode === 'dark' ? imgdark : imglight}></Avatar>
              <Typography variant="h4">
                <Link to={'/'} color="inherit" className="link">
                  GameSync
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}></Box>
            {!user.email ? (
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button
                  disableRipple
                  sx={{
                    color: `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.secondary.main
                        : theme.palette.primary.main
                    }`,
                  }}
                  onClick={handleToggle}
                >
                  {theme.palette.mode === 'dark' ? (
                    <LightModeIcon />
                  ) : (
                    <Brightness3Icon />
                  )}
                </Button>
                <Button
                  onClick={handleOpenSignin}
                  sx={{
                    color: `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.secondary.main
                        : theme.palette.primary.main
                    }`,
                  }}
                  className="button"
                >
                  Войти
                </Button>
                <Button
                  onClick={handleOpenLogin}
                  sx={{
                    color: `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.secondary.main
                        : theme.palette.primary.main
                    }`,
                  }}
                  className="button"
                >
                  Регистрация
                </Button>
              </Box>
            ) : (
              <Box sx={{ justifySelf: 'flex-end' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Button
                    disableRipple
                    sx={{
                      color: `${
                        theme.palette.mode === 'dark'
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                      }`,
                    }}
                    onClick={handleToggle}
                  >
                    {theme.palette.mode === 'dark' ? (
                      <LightModeIcon />
                    ) : (
                      <Brightness3Icon />
                    )}
                  </Button>
                  <Button sx={{ padding: 0, borderRadius: '50%' }} onClick={handleClick}>
                    <Avatar
                      alt={user.username}
                      src={
                        user.image?.match(/^(http|https):/)
                          ? user.image
                          : `http://localhost:3000/images/${user.image || ''}`
                      }
                      sx={{
                        color: 'black',
                        bgcolor: 'white',
                        width: 65,
                        height: 65,
                      }}
                    />
                  </Button>
                </Box>
                <Menu
                  sx={{ marginTop: '6px' }}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>{user.username}</MenuItem>
                  <MenuItem onClick={navigateToProfile}>Профиль</MenuItem>
                  {user.isAdmin && <MenuItem onClick={navigateToAdmin}>Админка</MenuItem>}
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleLogout();
                    }}
                  >
                    Выйти
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </>
      </AppBar>
      <ModalAuth />
    </>
  );
};

export default Navbar;
