import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../axiosInstance';

const fetchUserSignup = createAsyncThunk('user/signup', async (user) => {
  const response = await axiosInstance.post(`/auth/signup`, user);
  setAccessToken(response.data.accessToken);
  return response.data.user;
});

const fetchUserSignin = createAsyncThunk('user/signin', async (user) => {
  const response = await axiosInstance.post(`/auth/signin`, user);
  setAccessToken(response.data.accessToken);
  return response.data.user;
});

const fetchUserLogout = createAsyncThunk('user/logout', async () => {
  await axiosInstance.get(`/auth/logout`);
  setAccessToken('');
});

const fetchUserCheck = createAsyncThunk('user/check', async () => {
  const response = await axiosInstance.get(`/token/refresh`);
  setAccessToken(response.data.accessToken);
  if (response.status === 200) {
    return response.data.user;
  }
  if (response.status === 401) {
    setAccessToken('');
    return null;
  }
});
//
const fetchCreateGame = createAsyncThunk('admin/createGame', async (formData) => {
  const response = await axiosInstance.post('/admin/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
});

const fetchUserUpdate = createAsyncThunk('user/update', async (formData: FormData) => {
  const userId = formData.get('id');
  const response = await axiosInstance.put(`/edit/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  setAccessToken(response.data.accessToken);
  return response.data.user;
});

export {
  fetchUserSignup,
  fetchUserSignin,
  fetchUserLogout,
  fetchUserCheck,
  fetchCreateGame,
  fetchUserUpdate,
};
