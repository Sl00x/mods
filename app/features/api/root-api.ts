import { Game } from "@/interfaces/game.interface";
import { Mod } from "@/interfaces/mod.interface";
import { UpdateUserDto, User } from "@/interfaces/user.interface";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getFetchBaseQuery } from "./constant-api";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: getFetchBaseQuery(""),
  tagTypes: ["USER", "ME", "GAMES", "MODS"],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    signIn: builder.mutation<{ access_token: string }, Partial<User>>({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ME"],
    }),
    signUp: builder.mutation<User, User>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ME"],
    }),
    updateUser: builder.mutation<User, UpdateUserDto>({
      query: (body) => ({
        url: "/user",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ME"],
    }),
    updateAvatar: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/user/avatar",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ME"],
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["USER"],
    }),
    getNotAvailableUsername: builder.query<string[], void>({
      query: () => ({
        url: "/user/usernames",
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: ["ME"],
    }),
    createGame: builder.mutation<Game, Game>({
      query: (body) => ({
        url: "/games",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GAMES"],
    }),
    getGames: builder.query<Game[], void>({
      query: () => ({
        url: "/games",
      }),
      providesTags: ["GAMES"],
    }),
    getGamePlateforms: builder.query<Game, string>({
      query: (id) => ({
        url: `/games/${id}/plateforms`,
      }),
    }),
    createMod: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/mods",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MODS"],
    }),
    getModBySlug: builder.query<Mod, string>({
      query: (slug) => ({
        url: `/mods/slug/${slug}`,
      }),
      providesTags: (_, __, arg) => [{ type: "MODS", id: arg }],
    }),
    getMyMods: builder.query<Mod[], void>({
      query: () => ({
        url: `/mods/me`,
      }),
    }),
    getPreviewByCurrentVersion: builder.query<string[], string>({
      query: (id) => ({
        url: `/mods/version/${id}/previews`,
      }),
      providesTags: (_, __, arg) => [{ type: "MODS", id: arg }],
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
  useGetMeQuery,
  useCreateModMutation,
  usePrefetch,
  useGetModBySlugQuery,
  useLazyGetGamePlateformsQuery,
  useLazyGetPreviewByCurrentVersionQuery,
  useUpdateUserMutation,
  useGetNotAvailableUsernameQuery,
  useUpdateAvatarMutation,
  useGetMyModsQuery,
} = rootApi;
