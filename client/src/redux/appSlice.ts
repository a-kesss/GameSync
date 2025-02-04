import { User } from './types';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserSignup,
  fetchUserSignin,
  fetchUserLogout,
  fetchUserCheck,
  fetchCreateGame,
  fetchUserUpdate,
} from './thunkActions';

type initialStateType = {
  user: User;
  resMessage: string;
  isOpend: boolean;
  signup: boolean | null;
  loading: boolean;
};

const initialState: initialStateType = {
  user: {
    id: 0,
    username: '',
    email: '',
    image: '',
    isAdmin: false,
    info: '',
  },
  resMessage: '',
  isOpend: false,
  signup: null,
  loading: false,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setIsOpened: (state, action) => {
      state.isOpend = action.payload;
    },
    setIsSignup: (state, action) => {
      state.signup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSignup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserSignin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.user = initialState.user;
      })
      .addCase(fetchUserCheck.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCheck.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCheck.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.user = action.payload;
      });
    builder.addCase(fetchCreateGame.fulfilled, (state, action) => {
      state.resMessage = action.payload.message;
    });
  },
});

export const { setIsOpened, setIsSignup } = appSlice.actions;
export default appSlice.reducer;
