import { User } from "@/interfaces/user.interface";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useLazyGetMeQuery, useSignInMutation } from "../api/root-api";
import { getUser, setToken, setUser } from "../reducers/user-reducer";
import { useCookie } from "./cookie-hook";
import { useAppDispatch, useAppSelector } from "./root-hook";

export const useUserHook = () => {
  const [getMe, { isSuccess, isError, isLoading: loading }] = useLazyGetMeQuery(
    { refetchOnFocus: true }
  );
  const [login, { isLoading: loginLoading }] = useSignInMutation();
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { set } = useCookie();

  const getUserInfos = useCallback(async () => {
    return getMe()
      .unwrap()
      .then((user: User) => {
        dispatch(setUser(user));
        return user;
      })
      .catch(() => {
        dispatch(setUser(null));
        dispatch(setToken(undefined));
      });
  }, [dispatch, getMe]);

  const handleLogin = useCallback(
    (loginData: { email: string; password: string }) => {
      if (loginData.email === "" || loginData.password === "") {
        toast.error("Please fill empty fields.");
        return;
      }
      login(loginData)
        .unwrap()
        .then(async ({ access_token }) => {
          dispatch(setToken(access_token));
          localStorage.setItem("@token", access_token);
          set("@token", access_token);
          const user = await getUserInfos();
          if (user) {
            router.push("/");
          }
        })
        .catch((error) => {
          if (error.status === 400) {
            toast.error("Account not exist, please verify informations !");
          }
        });
    },
    [login, dispatch, getUserInfos, router]
  );

  const fetchUser = useCallback(async () => {
    if (user !== undefined) return;

    const token = localStorage.getItem("@token");
    if (!token) {
      dispatch(setUser(null));
      return;
    }
    dispatch(setToken(token));
    await getUserInfos();
  }, [user, dispatch, getUserInfos]);

  const handleLogout = useCallback(async () => {
    localStorage.removeItem("@token");
    dispatch(setUser(null));
    dispatch(setToken(undefined));
    router.push("/");
  }, [dispatch, router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loginLoading,
    isSuccess,
    isError,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };
};
