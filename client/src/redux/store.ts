import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';

const storeOptions = {
  reducer: {
    appSlice,
  },
};

const store = configureStore(storeOptions);
export default store;
