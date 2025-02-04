import { Box, Button, Modal, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Party from '../ui/Party';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Game } from '../../redux/types';
import axiosInstance from '../../axiosInstance';
import ModalCreateLobby from '../ui/ModalCreateLobby';
import GameParty from '../ui/GameParty';
import { useSelector } from 'react-redux';

export default function GamePage() {
  const theme = useTheme();
  const { id } = useParams();
  const [game, setGame] = useState<Game>();
  const [values, setValues] = useState([]);
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const user = useSelector((state: any) => state.appSlice.user);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const regex = /^(http|https):/g;

  const filteredParty = selectedParty
    ? values.filter((party) => party.id === Number(selectedParty))
    : values;

  const navigate = useNavigate();

  const backhendler = () => {
    navigate('/games');
  };

  useEffect(() => {
    axiosInstance.get(`/games/${id}`).then((response) => {
      setGame(response.data);
    });
    axiosInstance.get(`/party/${id}`).then((response) => {
      setValues(response.data.sort((a, b) => a.id - b.id));
    });
    axiosInstance.get(`/party/requests/game/${id}`).then((response) => {
      setRequests(response.data);
    });
  }, []);

  return user.id ? (
    <Box className="mainBox">
      <Box sx={{ display: 'flex', margin: '1%' }}>
        <Button
          sx={{
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
          }}
          onClick={backhendler}
        >
          <ArrowBackIosIcon />
          Назад
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            margin: '2vh',
            gap: '3vh',
            border: '2px solid black',
            padding: '2vh',
            borderRadius: '15px',
          }}
        >
          {game?.image.match(regex) ? (
            <img
              src={game.image}
              style={{ borderRadius: '10px', height: '200px', aspectRatio: '16/9' }}
            ></img>
          ) : (
            <img
              src={`http://localhost:3000/images/${game?.image}`}
              style={{ borderRadius: '10px', height: '200px', aspectRatio: '16/9' }}
            ></img>
          )}
          <Box>
            <Typography variant="h3">{game?.gamename}</Typography>
            <Typography variant="h5">{game?.description}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            margin: '0 2% 0 2%',
          }}
        >
          <TextField
            variant="outlined"
            label="Поиск лобби по ID:"
            size="small"
            onChange={(e) => setSelectedParty(e.target.value)}
            color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.23)'
                      : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                },
              },
            }}
          />
          <Button
            onClick={handleOpen}
            sx={{
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
            variant="contained"
          >
            Добавить своё лобби
          </Button>
          <ModalCreateLobby
            values={values}
            setValues={setValues}
            game={game}
            open={open}
            handleClose={handleClose}
          />
        </Box>
        <Box>
          {filteredParty?.map((el, index) => (
            <GameParty
              setRequests={setRequests}
              requests={requests.filter((req) => req.partyId === el.id)}
              party={el}
              key={index}
              values={values}
              setValues={setValues}
            />
          ))}
        </Box>
      </Box>
    </Box>,
  ) : (
    <Box sx={{
      display: 'flex',
      bgcolor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[900]
          : theme.palette.grey[100],
      height: '84vh',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize:"30px"
    }} >
      <Box> Вы не авторизованы</Box>
    </Box>
  );
}
