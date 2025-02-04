import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCreateGame } from '../../redux/thunkActions';

export default function AdminPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.appSlice);

  const [formData, setFormData] = useState({
    gamename: '',
    genre: '',
    description: '',
    img: null as File | null,
  });

  const [games, setGames] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const genres = ['Action', 'RPG', 'Adventure', 'Strategy', "Shooter", "Moba", "Sandbox", "Simulator"];

  useEffect(() => {
    if (tabIndex === 1) {
      fetchGames();
    }
  }, [tabIndex]);

  const fetchGames = async () => {
    try {
      const response = await axiosInstance.get('/games');
      setGames(response.data);
    } catch (err) {
      setError('Не удалось загрузить список игр');
    }
  };

  const deleteGame = async (id: number) => {
    try {
      await axiosInstance.delete(`/admin/delete/${id}`);
      setGames(games.filter((game) => game.id !== id));
      showSuccessMessage('Игра успешно удалена!');
    } catch (err) {
      setError('Ошибка при удалении игры');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData({ ...formData, img: file });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();
    data.append('gamename', formData.gamename);
    data.append('genre', formData.genre);
    data.append('description', formData.description);
    if (formData.img) {
      data.append('img', formData.img);
    }

    dispatch(fetchCreateGame(data));
    setFormData({ gamename: '', genre: '', description: '', img: null });
    showSuccessMessage('Игра успешно добавлена!');
    fetchGames();
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '85vh',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
        padding: theme.spacing(3),
        position: 'relative',
      }}
    >
      <Paper
        elevation={theme.palette.mode === 'dark' ? 4 : 2}
        sx={{
          padding: theme.spacing(5),
          maxWidth: 800,
          width: '100%',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.background.paper,
          borderRadius: '16px',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 600,
            marginBottom: theme.spacing(3),
          }}
        >
          Управление играми
        </Typography>

        {/* Вкладки */}
        <Tabs
          value={tabIndex}
          onChange={(event, newIndex) => setTabIndex(newIndex)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ marginBottom: theme.spacing(3) }}
        >
          <Tab label="Добавить игру" />
          <Tab label="Управление играми" />
        </Tabs>
        {tabIndex === 0 && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(2),
            }}
          >
            {error && (
              <Alert severity="error" sx={{ marginBottom: theme.spacing(2) }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Название игры"
              name="gamename"
              value={formData.gamename}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              select
              label="Жанр"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Описание"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
            <Button variant="outlined" component="label">
              Загрузить изображение
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Добавить игру'}
            </Button>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            {error && (
              <Alert severity="error" sx={{ marginBottom: theme.spacing(2) }}>
                {error}
              </Alert>
            )}

            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Список игр
            </Typography>
            <List>
              {games.map((game) => (
                <ListItem
                  key={game.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => deleteGame(game.id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={game.gamename}
                    secondary={`${game.description}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>

      {/* Уведомление */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Paper
          elevation={6}
          sx={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: theme.spacing(2),
            borderRadius: theme.spacing(1),
            border: '1px solid #c3e6cb',
          }}
        >
          <Typography>{successMessage}</Typography>
        </Paper>
      </Snackbar>
    </Grid>
  );
}
