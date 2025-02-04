import { Avatar, Box, Button, Typography, useTheme } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSelector } from 'react-redux';
import { State } from '../../redux/types';

interface PartyProps {
  party: any;
}

export default function Party({ party }: PartyProps) {
  const theme = useTheme(); // Get the current theme
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const additionalMembersCount = party?.maxmembers - (party.members?.length + 1);
  const user = useSelector((state: State) => state.appSlice.user);

  const buttonConfig = {
    text: 'Перейти в лобби',
    onClick: () => navigate(`/lobby/${party.id}`),
    show: true,
    disabled: false,
    gradient: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  };

  const containerStyles = {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const avatarStyles = {
    width: '60px',
    height: '60px',
  };

  const typographyStyles = {
    fontSize: '0.8rem',
  };

  return (
    <Box sx={containerStyles}>
      <Typography sx={{ margin: '2% 0 0 3%' }}>ID:{party.id}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '0 2%',
          padding: '20px',
          borderRadius: '15px',
          border: `2px solid ${
            theme.palette.mode === 'dark'
              ? theme.palette.secondary.main
              : theme.palette.primary.main
          }`,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.5)'
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.grey[100],
          gap: '20px',
        }}
      >
        {/* Left Section - Owner with Members */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flex: 1,
            position: 'relative',
            minWidth: 0,
          }}
        >
          {/* Owner Avatar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 'fit-content',
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
                ...avatarStyles,
                border: '3px solid gold',
                marginBottom: '4px',
              }}
            />
            <Typography
              sx={{
                ...typographyStyles,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                whiteSpace: 'nowrap',
                maxWidth: '80px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: '100%' }} />
              {party.owner?.username}
            </Typography>
          </Box>

          {/* Members Scroll Container */}
          <Box sx={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
            <Box
              ref={scrollContainerRef}
              sx={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                padding: '0 35px',
              }}
            >
              {/* Members */}
              {party.members?.map((member, index) => (
                <Box
                  onClick={() => {
                    if (member?.id !== user.id) {
                      navigate(`/profile/${member?.id}`);
                    }
                  }}
                  key={member?.id || index}
                  sx={{
                    cursor: member?.id !== user.id ? 'pointer' : 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: 'fit-content',
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
                      ...avatarStyles,
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
                      marginBottom: '4px',
                    }}
                  />
                  <Typography
                    sx={{
                      ...typographyStyles,
                      color: theme.palette.text.primary,
                      whiteSpace: 'nowrap',
                      maxWidth: '80px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'center',
                    }}
                  >
                    {member?.username}
                  </Typography>
                </Box>
              ))}

              {/* Empty Slots */}
              {additionalMembersCount > 0 &&
                Array.from({ length: additionalMembersCount }).map((_, index) => (
                  <Box
                    key={`empty-${index}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: 'fit-content',
                    }}
                  >
                    <Avatar
                      sx={{
                        ...avatarStyles,
                        border: `3px solid ${
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)'
                        }`,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.05)',
                        marginBottom: '4px',
                      }}
                    />
                    <Typography
                      sx={{
                        ...typographyStyles,
                        color:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.5)'
                            : 'rgba(0, 0, 0, 0.5)',
                        textAlign: 'center',
                      }}
                    >
                      Empty
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>

        {/* Right Section - Count and Button */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            minWidth: 'fit-content',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            {party.members?.length + 1}/{party?.maxmembers}
          </Typography>
          {buttonConfig.show && (
            <Button
              variant="contained"
              onClick={buttonConfig.onClick}
              disabled={buttonConfig.disabled}
              sx={{
                borderRadius: '8px',
                background:
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                padding: '10px 20px',
                whiteSpace: 'nowrap',
                boxShadow: `0 3px 5px 2px ${
                  theme.palette.mode === 'dark'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main
                }`,
                fontSize: '0.875rem',
                '&:hover': {
                  background:
                    theme.palette.mode === 'dark'
                      ? theme.palette.secondary.dark
                      : theme.palette.primary.dark,
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {buttonConfig.text}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
