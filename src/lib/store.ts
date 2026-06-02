import { configureStore } from '@reduxjs/toolkit';
import { coftochkaApi } from './api';

export const store = configureStore({
  reducer: {
    [coftochkaApi.reducerPath]: coftochkaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coftochkaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
