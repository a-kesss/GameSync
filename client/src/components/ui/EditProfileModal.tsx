import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Modal,
  Stack,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserUpdate } from '../../redux/thunkActions';
import { setIsOpened } from '../../redux/appSlice';
import type { State } from '../../redux/types';
import { useTheme } from '@emotion/react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '8px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  p: 4,
};

export default function EditProfileModal({
  open,
  onClose,
  submitHandler,
  successMessage,
  errorMessage,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.appSlice.user);

  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: '',
    info: user.info || '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    user.image?.match(/^(http|https):/)
      ? user.image
      : `http://localhost:3000/images/${user.image || ''}`,
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" marginBottom={2}>
          Редактирование Профиля
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Avatar
          alt={formData.username}
          src={previewImage}
          sx={{
            fontSize: '50px',
            border: '2px solid black',
            color: 'black',
            bgcolor: 'white',
            width: 150,
            height: 150,
            margin: '0 auto 20px auto',
          }}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler(formData, imageFile);
          }}
          encType="multipart/form-data"
        >
          <TextField
            margin="normal"
            label="Имя пользователя"
            variant="outlined"
            type="text"
            name="username"
            value={formData.username}
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
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
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
            label="Пароль"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
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
            label="О себе"
            variant="outlined"
            type="text"
            name="info"
            value={formData.info}
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

          <Button
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
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Загрузить фотографию
            <input type="file" hidden accept="image/*" onChange={imageChangeHandler} />
          </Button>

          <Stack
            direction="row"
            spacing={2}
            sx={{ marginTop: 3, justifyContent: 'center' }}
          >
            <Button color="error" variant="outlined" onClick={onClose}>
              Отменить
            </Button>
            <Button type="submit" color="success" variant="contained">
              Сохранить
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
