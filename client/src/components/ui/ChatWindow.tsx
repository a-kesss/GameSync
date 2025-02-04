import { Box, Button, Input, Paper, useTheme } from '@mui/material';
import { useState } from 'react';
import useChat from '../hoc/useChat';
import { useParams } from 'react-router-dom';
import MessageBox from './MessageBox';
import { useSelector } from 'react-redux';

export default function ChatWindow({ id }) {
  const theme = useTheme();
  const [input, setInput] = useState<string>('');

  const { messages, users, submitMessageHandler, deleteMessageHandler, exist } =
    useChat(id);
  const user = useSelector((state: State) => state.appSlice.user);
  const usersId = users.map((el) => el.id);

  return (
    <Box
      component={Paper}
      sx={{
        right: '2%',
        bottom: '10vh',
        width: '100%',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[100],
        borderRadius: '20px',
        border:
          theme.palette.mode === 'dark'
            ? '2px solid rgba(255, 255, 255, 0.15)'
            : '2px solid rgba(0, 0, 0, 0.15)',
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.5)'
            : '0 4px 20px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 998,
        height: '50vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          overflowAnchor: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          padding: '20px',
          paddingBottom: '60px',
          borderRadius: '20px',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.background.paper,
          boxShadow:
            theme.palette.mode === 'dark'
              ? 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
              : 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',

          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
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
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          scrollbarWidth: 'thin',
          scrollbarColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.2) transparent'
              : 'rgba(0, 0, 0, 0.2) transparent',
        }}
        ref={(el: any) => {
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        }}
      >
        {messages.length > 0 &&
          messages.map((message) => (
            <MessageBox
              key={message.id}
              type={message.authorId === user.id}
              info={message}
              deleteMessageHandler={deleteMessageHandler}
            />
          ))}
      </Box>

      <Box
        component="form"
        sx={{
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px',
          borderTop: `1px solid ${
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }`,
          display: 'flex',
          gap: '10px',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.background.paper,
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          zIndex: 2,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 -4px 6px rgba(0, 0, 0, 0.2)'
              : '0 -4px 6px rgba(0, 0, 0, 0.05)',
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (input.trim()) {
            submitMessageHandler(input);
            setInput('');
          }
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            flex: 1,
            color: theme.palette.text.primary,
            '&:before': {
              borderBottom: `1px solid ${
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.42)'
                  : 'rgba(0,0,0,0.42)'
              }`,
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: `2px solid ${
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.6)'
                  : theme.palette.primary.main
              }`,
            },
            '&.Mui-focused:after': {
              borderBottom: `2px solid ${theme.palette.primary.main}`,
            },
          }}
          placeholder="Type a message..."
        />
        <Button
          disabled={!input.trim()}
          type="submit"
          variant="contained"
          sx={{
            minWidth: '60px',
            bgcolor: theme.palette.secondary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
}
