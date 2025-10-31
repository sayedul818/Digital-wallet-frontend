import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { walletApi } from './api/walletApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [walletApi.reducerPath]: walletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(walletApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
