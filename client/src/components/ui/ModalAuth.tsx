import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { setIsSignup, setIsOpened } from '../../redux/appSlice';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { fetchUserSignin, fetchUserSignup } from '../../redux/thunkActions';
import { useTheme } from '@emotion/react';
import { State } from '../../redux/types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '8px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  p: 4,
};

export default function BasicModal() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const open = useSelector((state: State) => state.appSlice.isOpend);
  const signup = useSelector((state: State) => state.appSlice.signup);

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [error, setError] = useState('');

  const changeHandler = (e: Event) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    dispatch(setIsOpened(false));
    dispatch(setIsSignup(null));
    setError('');
    setInputs({
      username: '',
      password: '',
      email: '',
    });
  };

  const submitHandler = async (e: Event) => {
    e.preventDefault();
    if (signup === false) {
      if (inputs.username === '' || inputs.password === '') {
        setError('Заполните все поля');
        return;
      }
    }
    if (signup === true) {
      if (inputs.username === '' || inputs.password === '' || inputs.email === '') {
        setError('Заполните все поля');
        return;
      }
    }

    if (signup === false) {
      const response = await dispatch(fetchUserSignin(inputs));
      if (response.error?.message === 'Request failed with status code 400') {
        setError('Неверный логин или пароль');
      } else {
        handleClose();
      }
    } else {
      const response = await dispatch(fetchUserSignup(inputs));
      if (response.error?.message === 'Request failed with status code 400') {
        setError('Неверный логин или пароль');
      } else {
        handleClose();
      }
      await dispatch(fetchUserSignup(inputs));
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" marginBottom={2}>
          {signup === false ? 'Вход' : 'Регистрация'}
        </Typography>

        <TextField
          margin="normal"
          label="Login"
          variant="outlined"
          type="text"
          name="username"
          value={inputs?.username}
          onChange={changeHandler}
          fullWidth
          color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.23)'
                    : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              },
            },
          }}
        />
        <TextField
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={inputs?.password}
          onChange={changeHandler}
          fullWidth
          color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.23)'
                    : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              },
            },
          }}
        />
        {signup && (
          <TextField
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={inputs?.email}
            onChange={changeHandler}
            fullWidth
            color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.23)'
                      : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                },
              },
            }}
          />
        )}

        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}

        <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant={error ? 'outlined' : 'contained'}
            color={error ? 'error' : 'success'}
            onClick={submitHandler}
            fullWidth
          >
            {signup === false ? 'Войти' : 'Регистрация'}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
