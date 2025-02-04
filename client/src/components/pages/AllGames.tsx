import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Alert,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';

export default function AllGames() {
  const theme = useTheme();
  const navigate = useNavigate();
  const regex = /^(http|https):/g;

  const [games, setGames] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.appSlice.user);

  useEffect(() => {
    axiosInstance
      .get('/games')
      .then((response) => {
        setGames(response.data);
      })
      .catch(() => setErrorMessage('Ошибка загрузки списка игр.'));
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/edit/${user.id}/games`)
      .then((response) => {
        setUserGames(response.data);
      })
      .catch(() => setErrorMessage('Ошибка загрузки игр пользователя.'));
  }, [user.id]);

  const uniqueGenres = games.reduce((acc, game) => {
    if (!acc.includes(game.genre)) {
      acc.push(game.genre);
    }
    return acc;
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResetFilter = () => {
    setSelectedGenre(null);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    handleClose();
  };

  const handleAddGame = (gameId: number) => {
    axiosInstance
      .post(`/edit/${user.id}/games`, { gameId })
      .then(() => {
        setUserGames((prev) => [...prev, games.find((game) => game.id === gameId)]);
      })
      .catch(() => setErrorMessage('Ошибка добавления игры.'));
  };

  const handleRemoveGame = (gameId: number) => {
    axiosInstance
      .delete(`/edit/${user.id}/games/${gameId}`)
      .then(() => {
        setUserGames((prev) => prev.filter((game) => game.id !== gameId));
      })
      .catch(() => setErrorMessage('Ошибка удаления игры.'));
  };

  const filteredGames = selectedGenre
    ? games?.filter((game) => game.genre === selectedGenre)
    : games;

  return (
    <Box className="mainBox">
      <Box sx={{ display: 'flex', margin: '1%' }}>
        <Button
          color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
          onClick={handleBack}
        >
          <ArrowBackIosIcon />
          Назад
        </Button>
      </Box>
      <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <Typography variant="h2">Все игры</Typography>
      </Box>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Box sx={{ paddingLeft: '20px' }}>
        Выберите жанр:
        <Button
          color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          Фильтры
        </Button>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {uniqueGenres.map((genre) => (
            <MenuItem key={genre} onClick={() => handleGenreSelect(genre)}>
              {genre}
            </MenuItem>
          ))}
          {selectedGenre && (
            <MenuItem onClick={handleResetFilter} sx={{ color: 'red' }}>
              Сбросить фильтр
            </MenuItem>
          )}
        </Menu>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          padding: '20px',
          minHeight: '80vh',
          height: '100%',
        }}
      >
        {filteredGames.map((game) => {
          const isUserGame = userGames?.some((userGame) => userGame.id === game.id);
          return (
            <div
              onClick={() => navigate(`/games/${game.id}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                height: '270px',
                position: 'relative',
              }}
              key={game.id}
            >
              <img
                src={
                  game.image?.match(regex)
                    ? game.image
                    : `http://localhost:3000/images/${game.image}`
                }
                style={{
                  borderRadius: '10px',
                  height: '200px',
                  aspectRatio: '16/9',
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 4px 20px rgba(0, 0, 0, 1)'
                      : '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
                alt={game.gamename}
              />
              <IconButton
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
                color={isUserGame ? 'error' : 'default'}
                onClick={(event) => {
                  event.stopPropagation(); // Остановить всплытие события
                  isUserGame ? handleRemoveGame(game.id) : handleAddGame(game.id);
                }}
              >
                {isUserGame ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <h2>{game.gamename}</h2>
            </div>
          );
        })}
      </Box>
    </Box>
  );
}
