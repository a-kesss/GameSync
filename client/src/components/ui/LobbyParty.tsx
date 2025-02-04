import { useState } from 'react';
import { Box, Typography, Avatar, Button, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from '@emotion/react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance';
import { State } from '../../redux/types';
import { useNavigate } from 'react-router-dom';
import useChat from '../hoc/useChat';

interface PartyProps {
  party: {
    id: number;
    maxmembers: number;
    private: boolean;
    owner: {
      id: number;
      username: string;
      image: string;
    };
    members: Array<{
      id: number;
      username: string;
      image: string;
    }>;
  };
}

export default function LobbyParty({ party }: PartyProps) {
  const theme = useTheme();
  const user = useSelector((state: State) => state.appSlice.user);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { users } = useChat(party.id);

  const navigate = useNavigate();

  const leaveHandler = async () => {
    const response = await axiosInstance.post('/party/leave', {
      partyId: party.id,
      memberId: user.id,
    });

    if (response.status === 200) {
      navigate('/profile');
    }
  };

  return (
    <Box sx={{ width: '100%', right: '2%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          margin: '10px',
          padding: '15px',
          borderRadius: '15px',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 20px rgba(0, 0, 0, 1)',
          minHeight: '150px',
          position: 'relative',
        }}
      >
        <Typography
          sx={{ position: 'absolute', top: '5px', left: '10px', fontSize: '0.875rem' }}
        >
          ID:{party.id}
        </Typography>

        {/* Left Section - Owner */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '100px',
          }}
        >
          <Avatar
            src={
              party.owner?.image !== null
                ? party.owner?.image.match(/^(http|https):/)
                  ? party.owner?.image
                  : `http://localhost:3000/images/${
                      party.owner?.image || 'default-image-url'
                    }`
                : `http://localhost:3000/images/default-image-url`
            }
            sx={{
              width: '80px',
              height: '80px',
              border: '3px solid',
              borderColor: 'gold',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {users?.some((el) => el.id === party.owner.id) && (
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'green',
                  borderRadius: '50%',
                }}
              ></Box>
            )}
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 'bold',
                mt: 0.5,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                maxWidth: '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: '90%' }} />
              {party.owner?.username}
              {user.id === party.owner?.id ? ' (Вы)' : ''}
            </Typography>
          </Box>
        </Box>

        {/* Middle Section - Members or Private Message */}
        <Box sx={{ flex: 1, mx: 2 }}>
          {party.private &&
          !party.members?.some((el) => el.id === user?.id) &&
          party.owner.id !== user?.id ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '10px',
              }}
            >
              <LockIcon sx={{ fontSize: '1.5rem', mr: 1 }} />
              <Typography sx={{ fontStyle: 'italic', fontSize: '1.25rem' }}>
                Private Party
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                padding: '0 10px',
              }}
            >
              {party.private && (
                <LockIcon sx={{ fontSize: '1.5rem', mr: 1, alignSelf: 'center' }} />
              )}
              {party.members?.map((member) => (
                <Box
                  onClick={() => {
                    if (member?.id !== user.id) {
                      navigate(`/profile/${member?.id}`);
                    }
                  }}
                  key={member.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src={
                      member?.image.match(/^(http|https):/)
                        ? member?.image
                        : `http://localhost:3000/images/${
                            member?.image || 'default-image-url'
                          }`
                    }
                    sx={{
                      width: '80px',
                      height: '80px',
                      ':hover': {
                        borderColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.secondary.main
                            : theme.palette.primary.main,
                      },
                      border: `2px solid ${
                        theme.palette.mode === 'dark'
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                      }`,
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    {users?.some((el) => el.id === member.id) && (
                      <Box
                        sx={{
                          width: '10px',
                          height: '10px',
                          backgroundColor: 'green',
                          borderRadius: '50%',
                        }}
                      ></Box>
                    )}
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        mt: 0.5,
                        maxWidth: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',
                      }}
                    >
                      {member.username}
                      {user.id === member.id ? ' (Вы)' : ''}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {Array.from({
                length: party?.maxmembers - (party.members?.length + 1),
              }).map((_, index) => (
                <Box
                  key={`empty-${index}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      width: '80px',
                      height: '80px',
                      border: '2px solid',
                      borderColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      mt: 0.5,
                    }}
                  >
                    Слот
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right Section - Count and Button */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            minWidth: '100px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            {party.members?.length + 1}/{party.maxmembers}
          </Typography>
          <Button onClick={leaveHandler} variant="contained" size="small">
            Выйти из лобби
          </Button>
        </Box>
      </Box>
      {showMessage && (
        <Alert severity="success" sx={{ mt: 1 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
}
