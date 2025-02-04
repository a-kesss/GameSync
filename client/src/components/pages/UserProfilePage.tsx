import { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from '@mui/material';
import axiosInstance from '../../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProfilePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchGames = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/edit/${id}/games`);
          setGames(response.data || []);
          const userRespons = await axiosInstance.get(`/profile/${id}`);
          setUser(userRespons.data || {});
        } catch (error) {
          console.error('Ошибка загрузки игр:', error);
        }
      }
    };
    fetchGames();
  }, [id]);

  return id ? (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        bgcolor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
        padding: '20px',
        height: '84vh',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          bgcolor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.background.paper,
          borderRadius: '15px',
          padding: '20px',
          border: `3px solid ${
            theme.palette.mode === 'dark'
              ? theme.palette.secondary.main
              : theme.palette.primary.main
          }`,
          boxShadow: theme.shadows[4],
        }}
      >
        <Avatar
          alt={user.username}
          src={
            user.image?.match(/^(http|https):/)
              ? user.image
              : `http://localhost:3000/images/${user.image || ''}`
          }
          sx={{
            width: 250,
            height: 250,
            border: `8px solid ${
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.primary.main
            }`,
            bgcolor: theme.palette.background.paper,
          }}
        />
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: `1px solid ${theme.palette.divider}`,
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[800]
                : theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Montserrat Alternates',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '20px',
              color: theme.palette.text.primary,
            }}
          >
            Профиль пользователя
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '18px',
              marginBottom: '20px',
              color: theme.palette.text.primary,
            }}
          >
            <strong>Имя пользователя:</strong> {user.username}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '18px',
              marginBottom: '10px',
              color: theme.palette.text.primary,
            }}
          >
            <strong>О себе:</strong> {user.info || 'Информация отсутствует'}
          </Typography>
        </Paper>
      </Box>

      <Box
        sx={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.background.paper,
          borderRadius: '15px',
          padding: '20px',
          boxShadow: theme.shadows[4],
          overflow: 'auto',
          border: `3px solid ${
            theme.palette.mode === 'dark'
              ? theme.palette.secondary.main
              : theme.palette.primary.main
          }`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Montserrat Alternates',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            color: theme.palette.text.primary,
          }}
        >
          Игры пользователя
        </Typography>

        {games.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              fontSize: '18px',
              color: theme.palette.text.secondary,
            }}
          >
            У пользователя нет добавленных игр.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {games.map((game) => (
              <Card
                key={game.id}
                onClick={() => navigate(`/games/${game.id}`)}
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  maxWidth: 300,
                  borderRadius: '15px',
                  boxShadow: theme.shadows[8],
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[700]
                      : theme.palette.background.paper,
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={
                    game.image?.match(/^(http|https):/)
                      ? game.image
                      : `http://localhost:3000/images/${game.image}`
                  }
                  alt={game.gamename}
                  sx={{
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '18px',
                      textAlign: 'center',
                      marginBottom: '1px',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {game.gamename}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        bgcolor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Montserrat Alternates',
          textAlign: 'center',
          color: theme.palette.text.primary,
        }}
      >
        Пожалуйста, войдите, чтобы просмотреть профиль.
      </Typography>
    </Box>
  );
}
