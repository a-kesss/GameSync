import React, { useRef, useState } from 'react';
import { Box, Typography, Avatar, Button, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from '@emotion/react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance';
import { State } from '../../redux/types';
import { useNavigate } from 'react-router-dom';

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

export default function GameParty({
  type,
  party,
  values,
  setValues,
  requests,
  setRequests,
}: PartyProps) {
  const theme = useTheme();
  const user = useSelector((state: State) => state.appSlice.user);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const onSendRequest = async () => {
    axiosInstance
      .post('/party/sendRequest', { partyId: party.id, userId: user.id })
      .then((res) => {
        if (res.status === 201) {
          setRequests((prev) => [...prev, res.data.request]);
          setMessage('Запрос отправлен');
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
        }
      });
  };

  const onJoinParty = async () => {
    const response = await axiosInstance.post('/party/join', {
      partyId: party.id,
      memberId: user.id,
    });
    if (response.status === 201) {
      const index = values?.findIndex((el) => el.id === response.data.party.id);
      setValues((prev) => {
        const newValues = [...prev];
        newValues[index] = response.data.party;
        return newValues;
      });
    }
  };

  return (
    <Box
      onClick={() => {
        if (user.isAdmin) {
          navigate(`/lobby/${party.id}`);
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '20px',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 20px rgba(0, 0, 0, 1)',
          minHeight: '200px',
          position: 'relative',
        }}
      >
        <Typography sx={{ position: 'absolute', top: '10px', left: '15px' }}>
          ID:{party.id}
        </Typography>
        {/* Left Section - Owner */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '150px',
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
              width: '120px',
              height: '120px',
              border: '4px solid',
              borderColor: 'gold',
            }}
          />
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              mt: 1,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              maxWidth: '140px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textAlign: 'center',
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: '100%' }} />
            {party.owner?.username}
            {user.id === party.owner?.id ? ' (Вы)' : ''}
          </Typography>
        </Box>

        {/* Middle Section - Members or Private Message */}
        <Box sx={{ flex: 1, mx: 4 }}>
          {party.private &&
          !party.members?.some((el) => el.id === user?.id) &&
          party.owner.id !== user?.id ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '20px',
              }}
            >
              <LockIcon sx={{ fontSize: '2rem', mr: 2 }} />
              <Typography
                sx={{
                  fontStyle: 'italic',
                  fontSize: '1.5rem',
                }}
              >
                Private Party
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                padding: '0 20px',
              }}
            >
              {party.private && (
                <LockIcon sx={{ fontSize: '2rem', mr: 2, alignSelf: 'center' }} />
              )}
              {party.members?.map((member) => (
                <Box
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
                      width: '120px',
                      height: '120px',
                      ':hover ': {
                        borderColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.secondary.main
                            : theme.palette.primary.main,
                      },
                      border: `3px solid ${
                        theme.palette.mode === 'dark'
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                      }`,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      mt: 1,
                      maxWidth: '140px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'center',
                    }}
                  >
                    {member.username}
                    {user.id === member.id ? ' (Вы)' : ''}
                  </Typography>
                </Box>
              ))}

              {Array.from({
                length: party.maxmembers - (party.members?.length + 1),
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
                      width: '120px',
                      height: '120px',
                      border: '4px solid',
                      borderColor:
                        theme.palette.mode === 'dark'
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      mt: 1,
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
            gap: '15px',
            minWidth: '150px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',

              fontSize: '2rem',
            }}
          >
            {party.members?.length + 1}/{party.maxmembers}
          </Typography>
          <Button
            variant="contained"
            onClick={party.private ? onSendRequest : onJoinParty}
            disabled={
              party.members?.length + 1 >= party?.maxmembers ||
              user.id === party.owner?.id ||
              party.members?.some((member) => member.id === user.id) ||
              requests?.some((req) => req.userId === user.id)
            }
            sx={{
              borderRadius: '10px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              boxShadow: `0 3px 5px 2px ${
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main
              }`,
              transition: 'all 0.3s ease',
            }}
          >
            {party.private ? 'Отправить запрос' : 'Присоединиться к пати'}
          </Button>
          {showMessage && (
            <Alert sx={{ position: 'absolute', top: '10px' }} hidden={!showMessage}>
              {message}
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
}
