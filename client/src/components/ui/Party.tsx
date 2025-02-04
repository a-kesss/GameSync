import { Alert, Avatar, Box, Button, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axiosInstance from '../../axiosInstance';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { State } from '../../redux/types';

export default function Party({ party }) {
  const additionalMembersCount = party?.maxmembers - (party.Partymembers?.length + 1);

  const user = useSelector((state: State) => state.appSlice.user);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleJoinParty = async () => {
    setMessage('');
    setError('');
    try {
      const response = await axiosInstance.post('/party/join', {
        partyId: party.id,
        memberId: user.id,
      });
      if (response.status === 201) {
        setMessage(response.data.message);
      }
      if (response.data.error === true) {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Ошибка при присоединении к пати:', error);
    }
  };

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <>
      {message && (
        <Alert
          sx={{
            position: 'fixed',
            top: '80%',
            left: '80%',
            zIndex: 9999,
            width: '300px',
            fontSize: '1.2rem',
            border: '2px solid black',
          }}
          severity="success"
        >
          {message}
        </Alert>
      )}
      {error && (
        <Alert
          sx={{
            position: 'fixed',
            top: '80%',
            left: '80%',
            zIndex: 9999,
            width: '300px',
            fontSize: '1.2rem',
            border: '2px solid black',
          }}
          severity="error"
        >
          {error}
        </Alert>
      )}
      <Typography sx={{ margin: '2% 0 0 3%' }}>ID:{party.id}</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '2%',

          margin: '0 2%',
          padding: '2%',
          borderRadius: '15px',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 20px rgba(0, 0, 0, 1)',
          backgroundColor: 'gray',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', gap: '3%' }}>
          <Box>
            <Avatar
              src={party.User?.image || 'default-image-url'}
              sx={{ width: '100px', height: '100px', border: '2px solid #007bff' }}
            />
            <Typography
              variant="h5"
              sx={{ display: 'flex', gap: '5%', color: '#007bff' }}
            >
              {party.User?.username}
              <EmojiEventsIcon sx={{ fontSize: '100%' }} />
            </Typography>
          </Box>
          {!party?.private ? (
            party.Partymembers?.map((member, index) => (
              <Box key={member?.id || index} sx={{ textAlign: 'center' }}>
                <Avatar
                  src={member?.image || 'default-image-url'}
                  sx={{ width: '100px', height: '100px', border: '2px solid #007bff' }}
                />
                <Typography variant="h6" sx={{ color: '#333' }}>
                  {member?.username}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography
              variant="h3"
              sx={{
                display: 'flex',
                marginLeft: '5%',
                color: 'black',
                textAlign: 'center',
              }}
            >
              <LockPersonIcon sx={{ fontSize: '200%' }}></LockPersonIcon>
              Приватное лобби
            </Typography>
          )}
          {!party.private &&
            additionalMembersCount > 0 &&
            Array.from({ length: additionalMembersCount }).map((_, index) => (
              <Box
                key={`empty-member-${index}`}
                sx={{ opacity: '0.5', textAlign: 'center' }}
              >
                <Avatar
                  sx={{ width: '100px', height: '100px', border: '2px solid #007bff' }}
                />
                <Typography variant="h6" sx={{ color: '#333' }}>
                  Слот
                </Typography>
              </Box>
            ))}
        </Box>
        <Box sx={{ display: 'flex', gap: '20%', alignItems: 'center' }}>
          <Box>
            <Typography variant="h1">
              {party.Partymembers?.length + 1}/{party?.maxmembers}
            </Typography>
          </Box>
          {party?.private === false ? (
            <Button
              variant="contained"
              onClick={handleJoinParty}
              sx={{
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #ff4081 30%, #f50057 90%)',
                padding: '10px 20px',
                boxShadow: '0 3px 5px 2px rgba(0, 123, 255, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0056b3 30%, #004494 90%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 10px 2px rgba(0, 123, 255, .5)',
                },
                transition: 'background-color 0.3s ease, transform 0.2s ease',
              }}
            >
              Вступить в пати
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                borderRadius: '8px',
                background:
                  'linear-gradient(45deg,rgb(0, 0, 0) 30%,rgb(107, 106, 106) 90%)',
                padding: '10px 20px',
                boxShadow: '0 3px 5px 2px rgba(0, 123, 255, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0056b3 30%, #004494 90%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 10px 2px rgba(0, 123, 255, .5)',
                },
                transition: 'background-color 0.3s ease, transform 0.2s ease',
              }}
            >
              Подать заявку
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
