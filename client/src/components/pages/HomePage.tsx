import { Box, Typography, Button } from '@mui/material';
import video from '../../../../server/public/video/background.mp4';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '85vh',
        overflow: 'hidden',
      }}
    >
      <Box
        component="video"
        autoPlay
        loop
        muted
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={video} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: 'Montserrat Alternates' }}
        >
          Приветствуем тебя, искатель кооперативных приключений!
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontFamily: 'Montserrat Alternates' }}
        >
          Добро пожаловать на нашу платформу, где каждый найдет идеального напарника для
          своих игровых сражений!
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontFamily: 'Montserrat Alternates' }}
        >
          Здесь ты можешь найти друга для совместного прохождения, союзника для эпических
          битв или просто компанию для веселых вечеров за любимой игрой.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color={
            theme.palette.mode === 'dark'
              ? theme.palette.secondary.main
              : theme.palette.primary.main
          }
          sx={{
            marginTop: 3,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.dark,
            },
          }}
          onClick={() => navigate('/games')}
        >
          Начать играть
        </Button>
      </Box>
    </Box>
  );
}
