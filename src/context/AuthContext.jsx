import {createContext, useContext, useEffect, useState} from "react";
import * as authApi from "@/api/auth";
import {useNotification} from "@/components/Notification/NotificationContext";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [authOpen, setAuthOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const {showNotification} = useNotification();

  const isAuth = !!user;

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const openSuccess = () => setSuccessOpen(true);
  const closeSuccess = () => setSuccessOpen(false);

  const login = async (data) => {
    const res = await authApi.login(data);

    if (!res?.data?.token || !res?.data?.user) {
      throw new Error("Неверный ответ сервера");
    }

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    closeAuth();

    showNotification({
      title: "Вы успешно вошли в аккаунт",
      message: "Ваш аккаунт теперь активен",
      type: "success"
    });
  };

  const register = async (data) => {
    const res = await authApi.register(data);

    if (!res?.status || res.status !== 200 && res.status !== 201) {
      throw new Error("Ошибка регистрации");
    }

    closeAuth();
    openSuccess();
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingUser(false);
      return;
    }

    authApi.getMe()
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoadingUser(false));

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