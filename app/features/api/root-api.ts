import { createApi } from '@reduxjs/toolkit/query/react';
import { getFetchBaseQuery } from './constant-api'
import { User } from '@/interfaces/user.interface';
import { Game } from '@/interfaces/game.interface';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: getFetchBaseQuery(''),
  tagTypes: ['USER', 'ME', 'GAMES'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    signIn: builder.mutation<{access_token: string}, Partial<User>>({
      query: (body) => ({
        url: '/auth',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ME'],
    }),
    signUp: builder.mutation<User, User>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ME'],
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '/user',
      }),
      providesTags: ['USER'],
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/user/me',
      }),
      providesTags: ['ME'],
    }),
    createGame: builder.mutation<Game, Game>({
      query: (body) => ({
        url: '/games',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GAMES'],
    }),
    getGames: builder.query<Game[], void>({
      query: () => ({
        url: '/games',
      }),
      providesTags: ['GAMES'],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetGamesQuery,
  useCreateGameMutation,
  useGetUsersQuery,
  useLazyGetMeQuery,
  usePrefetch,
} = rootApi;