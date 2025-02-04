import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Divider,
  Button,
  Avatar,
} from '@mui/material';
import useChat from '../hoc/useChat';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/types';
import ChatWindow from '../ui/ChatWindow';
import axiosInstance from '../../axiosInstance';
import { useTheme } from '@mui/material';
import LobbyParty from '../ui/LobbyParty';
import InboxIcon from '@mui/icons-material/Inbox';

export default function LobbyPage() {
  const theme = useTheme();
  const [currentLobby, setCurrentLobby] = useState([]);
  const id = useParams().id;
  const { users, exist } = useChat(id);
  const user = useSelector((state: State) => state.appSlice.user);
  const usersId = users.map((el) => el.id);
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [showInbox, setShowInbox] = useState(false);

  const rejectHandler = async (id: number) => {
    const response = await axiosInstance.put(`/party/requests/${id}/reject`);
    const index = requests?.findIndex((el) => el.id === response.data.request.id);
    setRequests((prev) => {
      const newValues = [...prev];
      newValues[index].accepted = response.data.request.accepted;
      return newValues;
    });
  };

  const acceptHandler = async (id: number) => {
    const response = await axiosInstance.put(`/party/requests/${id}/accept`);
    if (response.status === 200) {
      setCurrentLobby(response.data?.party);
      setRequests((prev) => prev.filter((el) => el.id !== id));
    }
  };

  useEffect(() => {
    axiosInstance.get(`/party/lobby/${id}`).then((res) => {
      setCurrentLobby(res.data);
    });
    axiosInstance
      .get(`/party/details/${id}`)
      .then((response) => {
        setGameDetails(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки деталей лобби:', error);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get(`/party/requests/${user.id}`);
        setRequests(response.data.filter((el) => el.partyId === currentLobby.id) || []);
      } catch (error) {
        console.error('Ошибка загрузки деталей лобби:', error);
      }
    };

    fetchRequests();
  }, [currentLobby]);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '84vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!gameDetails) {
    return (
      <Box
        sx={{
          minHeight: '84vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
        }}
      >
        <Typography variant="h3">Лобби не найдено</Typography>
      </Box>
    );
  }

  if (!exist) {
    return (
      <Box
        component={Paper}
        sx={{
          minHeight: '84vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
        }}
      >
        <Typography variant="h3">Нет лобби с таким айди</Typography>
      </Box>
    );
  }

  return usersId.includes(user.id) ||
    user.isAdmin ||
    currentLobby.owner?.id === user.id ? (
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
        paddingLeft: '60px',
      }}
    >
      <Box
        sx={{
          width: '70%',
          height: '100%',
          paddingRight: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component={Paper}
          sx={{
            padding: '20px',
            borderRadius: '10px',
            height: '100%',
            border: '2px solid gold',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 4px 12px rgba(0, 0, 0, 0.7)'
                : '0 4px 12px rgba(0, 0, 0, 0.2)',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(0, 0, 0, 0.3)',
              },
            },
          }}
        >
          <Box
            sx={{
              marginBottom: '20px',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <img
              src={
                gameDetails.game?.image?.match(/^https?:\/\//)
                  ? gameDetails.game?.image
                  : `http://localhost:3000/images/${gameDetails.game.image}`
              }
              alt={gameDetails.game?.gamename}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </Box>
          <Typography variant="h4" sx={{ marginBottom: '15px', fontWeight: 'bold' }}>
            {gameDetails.game.gamename}
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, marginBottom: '15px' }}>
            {gameDetails.game.description}
          </Typography>
          <Divider sx={{ marginY: '15px' }} />
          <Typography variant="body1">
            <b>О группе:</b>
            <br />
            <b>Максимум игроков:</b> {gameDetails.party.maxmembers}
            <br />
            <b>Язык:</b> {gameDetails.party.language}
            <br />
            <b>Возрастное ограничение:</b> {gameDetails.party.age}+
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '10px' }}>
            <b>Описание лобби:</b> {gameDetails.party.description}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '65%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {' '}
        {user.id === currentLobby.owner.id && (
          <Box>
            {' '}
            <Button
              onClick={() => setShowInbox(!showInbox)}
              sx={{
                position: 'absolute',
                top: '120px',
                right: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transitionDuration: '0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <InboxIcon />
              {requests.filter((el) => el?.accepted === false).length > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '19px',
                    right: '25px',
                    borderRadius: '50%',
                    width: '5px',
                    height: '5px',
                    backgroundColor: theme.palette.secondary.main,
                  }}
                ></Box>
              )}
              <Box sx={{ position: 'relative' }}></Box>
            </Button>
            <Box
              sx={{
                border: '1px solid black',
                borderRadius: '30px',
                width: '100%',
                position: 'absolute',
                top: '130px',
                right: '50px',
                zIndex: '9999',
                overflowY: 'hidden', // Changed from "scroll" to "auto"
                maxWidth: showInbox ? '360px' : 0,
                maxHeight: showInbox ? '400px' : 0, // Add this to limit height
                transition: 'max-height 0.3s ease-in-out, max-width 0.3s ease-in-out',
              }}
            >
              <Box
                sx={{
                  border: '1px solid black',
                  borderRadius: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  padding: '20px',
                  gap: '20px',
                  maxHeight: '400px', // Add this to limit height
                  overflowY: 'auto', // Changed from "scroll" to "auto"
                  '&::-webkit-scrollbar': {
                    width: '8px',
                    backgroundColor: 'transparent',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.3)'
                          : 'rgba(0, 0, 0, 0.3)',
                    },
                  },
                }}
              >
                {requests.length === 0 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    У вас нет запросов в пати
                  </Box>
                ) : (
                  requests?.map((el, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '10px',
                        borderRadius: '10px',
                        border: `1px solid ${
                          theme.palette.mode === 'dark'
                            ? theme.palette.secondary.main
                            : theme.palette.primary.main
                        }`,
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.grey[800]
                            : theme.palette.background.paper,
                        boxShadow: theme.shadows[4],
                      }}
                    >
                      <Avatar
                        src={
                          el.user?.image.match(/^(http|https):/)
                            ? el.user?.image
                            : `http://localhost:3000/images/${
                                el.user?.image || 'default-image-url'
                              }`
                        }
                      />
                      <Typography>
                        Пользователь {el.user?.username} хочет вступить в ваше лобби с id:
                        {el.partyId}
                      </Typography>
                      <Box
                        sx={{
                          flexDirection: 'column',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {!el.accepted ? (
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              width: '100%',
                              bgcolor:
                                theme.palette.mode === 'dark'
                                  ? theme.palette.secondary.main
                                  : theme.palette.primary.main,
                            }}
                            onClick={() => rejectHandler(el.id)}
                          >
                            Отклонить
                          </Button>
                        ) : (
                          <Typography>Отклонен</Typography>
                        )}
                        <Button
                          variant="contained"
                          sx={{
                            fontSize: '10px',
                            width: '100%',
                            bgcolor:
                              theme.palette.mode === 'dark'
                                ? theme.palette.secondary.main
                                : theme.palette.primary.main,
                          }}
                          onClick={() => acceptHandler(el.id)}
                        >
                          Принять
                        </Button>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        )}
        <LobbyParty type="lobby" party={currentLobby} />
        <ChatWindow id={Number(id)} />
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        maxWidth: '100%',
        minHeight: '84vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[50],
      }}
    >
      <Typography variant="h3">Вы не состоите в этом лобби</Typography>
    </Box>
  );
}
