// Footer.tsx
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    // Alternative styled version
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '8vh',
        background: 'linear-gradient(to right,rgb(0, 0, 0),rgb(0, 0, 0))',
        color: 'white',
        zIndex: 999,
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 1)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 },
            }}
          >
            © {new Date().getFullYear()} GameSync
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.6,
              display: { xs: 'none', md: 'block' },
            }}
          >
            •
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              display: { xs: 'none', md: 'block' },
            }}
          >
            All rights reserved
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              display: { xs: 'none', sm: 'block' },
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 },
            }}
          >
            Москва, Шоссе Энтузиастов 12 ст2
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                display: { xs: 'none', sm: 'block' },
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 1 },
              }}
            >
              Контакты:
            </Typography>
            <IconButton sx={{ color: 'white' }} href="https://t.me/a_kesss">
              <TelegramIcon />
            </IconButton>
            <IconButton sx={{ color: 'white' }} href="https://github.com/Lisarusx1">
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
