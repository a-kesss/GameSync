import { Avatar, Box, Button, Paper, Typography, useTheme } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';

export default function MessageBox({ info, type, deleteMessageHandler }) {
  const theme = useTheme();
  const user = useSelector((state: State) => state.appSlice.user);

  return (
    <Box
      component={Paper}
      sx={{
        overflow: 'hidden',
        padding: '10px',
        minHeight: 'min-content',
        maxWidth: '70%',
        width: 'auto',
        alignSelf: type ? 'flex-end' : 'flex-start',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        margin: '3px 10px',
        backgroundColor: type
          ? theme.palette.primary.main
          : theme.palette.mode === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.grey[200],
        color: type ? '#fff' : theme.palette.text.primary,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 2px 4px rgba(0, 0, 0, 0.2)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        sx={{
          paddingLeft: type ? 0 : '30px',
          minHeight: 'min-content',
          height: '100%',
          overflowX: 'hidden',
          width: '100%',
          paddingRight: type ? '30px' : 0,
          fontSize: '0.9rem',
          wordBreak: 'break-word',
        }}
      >
        {info.text}
      </Typography>
      <Avatar
        src={
          info.userImage?.match(/^(http|https):/)
            ? info.userImage
            : `http://localhost:3000/images/${info.userImage}`
        }
        sx={{
          position: 'absolute',
          right: type ? '9px' : 'auto',
          left: type ? 'auto' : '9px',
          bottom: '9px',
          width: 24,
          height: 24,
          border: `2px solid ${
            type
              ? theme.palette.primary.dark
              : theme.palette.mode === 'dark'
              ? theme.palette.grey[700]
              : theme.palette.grey[300]
          }`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: !type ? '5px' : 'auto',
          left: !type ? 'auto' : '5px',
          bottom: '0px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {(type || user.isAdmin) && ( // Only show delete button for user's own messages
          <Button
            sx={{
              maxHeight: '10px',
              maxWidth: '10px',
              width: '10px',
              minWidth: '10px',
              padding: 0,
              '&:hover': {
                color: 'error.main', // Add red color on hover
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              deleteMessageHandler(info.id);
            }}
          >
            <DeleteForeverIcon
              sx={{ fontSize: '16px', color: theme.palette.secondary.main }}
            />
          </Button>
        )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: type ? '30px' : 'auto',
          left: type ? 'auto' : '30px',
          bottom: '0px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.7rem',
            color: type ? 'rgba(255,255,255,0.6)' : theme.palette.text.secondary,
          }}
        >
          {info.username}
        </Typography>
      </Box>
    </Box>
  );
}
