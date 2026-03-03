import {createContext, useContext, useEffect, useState} from "react";
import * as authApi from "@/api/auth";
import {showNotification} from "@/components/Notification/Notification";
import {useQueryClient} from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const queryClient = useQueryClient();

  const [authOpen, setAuthOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const isAuth = !!user && !loadingUser;

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const openSuccess = () => setSuccessOpen(true);
  const closeSuccess = () => setSuccessOpen(false);

  const login = async (data) => {

    const res = await authApi.login(data);

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    queryClient.invalidateQueries({queryKey: ["favorites"]});

    closeAuth();

    showNotification({
      title: "Вы успешно вошли в аккаунт",
      message: "Ваш аккаунт активен",
      type: "success"
    });
  };

  const register = async (data) => {

    const res = await authApi.register(data);

    if (res.status === 200 || res.status === 201) {
      closeAuth();
      openSuccess();
    }
  };

  const logout = async () => {

    try {
      await authApi.logout();
    } catch {}

    localStorage.removeItem("token");

    setUser(null);

    queryClient.clear();
  };

  const refreshAuth = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingUser(false);
      return;
    }

    try {
      const res = await authApi.getMe();
      setUser(res.data);
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      authOpen,
      successOpen,
      openAuth,
      closeAuth,
      closeSuccess,
      user,
      isAuth,
      login,
      register,
      logout,
      loadingUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);