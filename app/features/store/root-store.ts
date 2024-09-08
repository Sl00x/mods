import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootApi } from '../api/root-api';
import userReducer from '../reducers/user-reducer';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    [userReducer.reducerPath]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);