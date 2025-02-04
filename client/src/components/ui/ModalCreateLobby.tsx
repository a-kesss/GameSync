import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/types';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { useTheme } from '@emotion/react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  bgcolor: 'background.paper',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

const ModalCreateLobby = ({ game, open, handleClose, setValues, values }) => {
  const user = useSelector((state: State) => state.appSlice.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    gameId: Number(id),
    description: '',
    age: 0,
    language: '',
    maxmembers: 1,
    private: false,
    ownerId: user.id,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      private: e.target.checked,
    }));
  };

  const handleChangeNumbers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleChangeMaxMembers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (Number(value) > 6) {
      setFormData({ ...formData, [name]: 6 });
    } else if (Number(value) < 1) {
      setFormData({ ...formData, [name]: 1 });
    } else
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleSubmit = async () => {
    const response = await axiosInstance.post('/party/add', formData);
    setValues((prev) => [...prev, response.data.party]);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Создать своё лобби {game?.gamename}
        </Typography>
        <TextField
          label="Описание"
          value={formData.description}
          name="description"
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
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
          label="Возраст"
          value={formData.age}
          name="age"
          onChange={handleChangeNumbers}
          fullWidth
          margin="normal"
          type="number"
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
          label="Язык"
          value={formData.language}
          name="language"
          onChange={handleInputChange}
          fullWidth
          margin="normal"
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
          label="Максимальное число участников"
          name="maxmembers"
          value={formData.maxmembers}
          onChange={handleChangeMaxMembers}
          fullWidth
          margin="normal"
          type="number"
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

        <FormControlLabel
          name="isPrivate"
          control={<Switch checked={formData.private} onChange={handleChange} />}
          label={formData.private ? 'Приватная игра' : 'Публичная игра'}
          sx={{ marginTop: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.dark,
            },
          }}
        >
          Создать
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCreateLobby;
