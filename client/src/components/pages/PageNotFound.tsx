import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

export default function PageNotFound(): JSX.Element {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '84vh',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2" gutterBottom >
        Такой страницы не существует
      </Typography>
    </Box>
  );
}
