import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Avatar,
  Typography,
  Paper,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  useTheme,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DeleteIcon from '@mui/icons-material/Delete';
import type { State } from '../../redux/types';
import axiosInstance from '../../axiosInstance';
import NewParty from '../ui/NewParty';
import EditProfileModal from '../ui/EditProfileModal';
import { useNavigate } from 'react-router-dom';
import { fetchUserUpdate } from '../../redux/thunkActions';

export default function ProfilePage() {
  const theme = useTheme();
  const user = useSelector((state: State) => state.appSlice.user);
  const [games, setGames] = useState([]);
  const [party, setParty] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showInbox, setShowInbox] = useState(false);
  const [request, setRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (formData, imageFile) => {
    const formDataToSend = new FormData();
    formDataToSend.append('id', user.id.toString());
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('info', formData.info);

    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      const response = await dispatch(fetchUserUpdate(formDataToSend)).unwrap();
      setParty((prev) => {
        return prev.map((party) => {
          let updatedParty = { ...party };

          // Check if this party's owner matches the response id
          if (party.owner.id === response.id) {
            updatedParty.owner = response;
          }

          // Check if any member matches the response id
          if (party.members?.some((member) => member.id === response.id)) {
            updatedParty.members = party.members?.map((member) =>
              member.id === response.id ? response : member,
            );
          }

          return updatedParty;
        });
      });

      setSuccessMessage('Профиль успешно обновлен');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Ошибка при обновлении профиля');
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      if (user?.id) {
        try {
          const response = await axiosInstance.get(`/edit/${user.id}/games`);
          setGames(response.data || []);

          const res = await axiosInstance.get(`/party/user/${user.id}`);
          setParty(res.data || []);
        } catch (error) {
          console.error('Ошибка загрузки игр:', error);
        }

        const reqresponse = await axiosInstance.get(`/party/requests/${user.id}`);
        setRequests(reqresponse.data || []);
      }
    };
    fetchGames();
  }, [user?.id]);

  const rejectHandler = async (id: number) => {
    const response = await axiosInstance.put(`/party/requests/${id}/reject`);
    const index = request?.findIndex((el) => el.id === response.data.request.id);
    setRequests((prev) => {
      const newValues = [...prev];
      newValues[index].accepted = response.data.request.accepted;
      return newValues;
    });
  };

  const acceptHandler = async (id: number) => {
    const response = await axiosInstance.put(`/party/requests/${id}/accept`);
    const index = party?.findIndex((el) => el.id === response.data.party.id);
    if (response.status === 200) {
      setParty((prev) =>
        prev.map((el) => {
          if (el.id === response.data.party?.id) {
            return response.data?.party;
          } else {
            return el;
          }
        }),
      );
      setRequests((prev) => prev.filter((el) => el.id !== id));
    }
  };

  const handleEdit = () => setIsModalOpen(true);

  const handleDeleteGame = async (gameId: number) => {
    try {
      await axiosInstance.delete(`/edit/${user.id}/games/${gameId}`);
      setGames((prevGames) => prevGames.filter((game) => game?.id !== gameId));
    } catch (error) {
      console.error('Ошибка удаления игры:', error);
    }
  };

  return user?.id ? (
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
            maxHeight: '350px',
            overflow: 'auto',
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: `1px solid ${theme.palette.divider}`,
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[800]
                : theme.palette.background.paper,
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
              marginBottom: '20px',
              color: theme.palette.text.primary,
            }}
          >
            <strong>Email:</strong> {user.email}
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
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: '20px',
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.dark,
            },
          }}
          onClick={handleEdit}
        >
          Редактировать профиль
        </Button>
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
          Ваши игры
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
            У вас нет добавленных игр.
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
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '10px',
                  }}
                >
                  <IconButton
                    edge="end"
                    color="secondary"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteGame(game.id);
                    }}
                    sx={{
                      fontSize: '24px',
                      '&:hover': {
                        color: theme.palette.secondary.dark,
                      },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: '32px' }} />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
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
          position: 'relative',
        }}
      >
        <Button
          onClick={() => setShowInbox(!showInbox)}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '1px',
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
          {request.filter((el) => el?.accepted === false).length > 0 && (
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
            top: '30px',
            right: '30px',
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
            {request.length === 0 ? (
              <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                У вас нет запросов в пати
              </Box>
            ) : (
              request?.map((el, index) => (
                <Box
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

        {party?.map((el, index) => (
          <NewParty type="profile" party={el} key={index} />
        ))}
      </Box>

      <EditProfileModal
        successMessage={successMessage}
        submitHandler={submitHandler}
        errorMessage={errorMessage}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '84vh',
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
