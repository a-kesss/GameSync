import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import type { Message, User } from '../../redux/types';
import { retry } from '@reduxjs/toolkit/query';

const useChat = (id) => {
  const [exist, setExist] = useState(false);
  const [messages, setMessages] = useState<Array<Message | null>>([]);
  const [users, setUsers] = useState([]);
  const [lobbyUsers, setLobbyUsers] = useState([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    axiosInstance.get(`/messages/lobby/${id}`).then(({ data }) => {
      setExist(data);
    });
    axiosInstance.get(`/messages/${id}`).then((res) => {
      setMessages(res.data);
    });
    axiosInstance.get(`/messages/users/${id}`).then(({ data }) => {
      setLobbyUsers(data.map((el) => el.User.id));
    });
  }, []);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3000');
    const socket = socketRef.current;

    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'ADD_MESSAGE_FROM_SERVER':
          payload.userImage = payload.User.image;
          payload.username = payload.User.username;
          if (payload.lobbyId === Number(id)) {
            setMessages((prev: Array<null>) => [...prev, payload]);
          }
          break;

        case 'ADD_USERS_FROM_SERVER':
          setUsers(payload.filter((el: Message) => lobbyUsers.includes(el.id)));
          break;

        case 'DELETE_MESSAGE_FROM_SERVER':
          setMessages((prev: Array<null>) =>
            prev.filter((el: Message) => el.id !== payload.messageId),
          );
          break;

        case 'ERROR_FROM_SERVER':
          console.error('Server error:', payload);
          // You might want to add error state handling here
          break;

        default:
          break;
      }
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [lobbyUsers]);

  const submitMessageHandler = (input: string) => {
    const socket = socketRef.current;

    if (socket) {
      socket.send(
        JSON.stringify({ type: 'ADD_MESSAGE_FROM_CLIENT', payload: input, lobby: id }),
      );
    }
  };

  const deleteMessageHandler = (messageId: number) => {
    const socket = socketRef.current;

    if (socket) {
      socket.send(
        JSON.stringify({ type: 'DELETE_MESSAGE_FROM_CLIENT', payload: messageId }),
      );
    }
  };

  return { messages, users, submitMessageHandler, deleteMessageHandler, exist };
};

export default useChat;
