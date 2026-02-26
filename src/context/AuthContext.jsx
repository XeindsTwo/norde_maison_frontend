import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "@/api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authOpen, setAuthOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const isAuth = !!user;

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const openSuccess = () => setSuccessOpen(true);
  const closeSuccess = () => setSuccessOpen(false);

  const login = async (data) => {

    const res = await authApi.login(data);

    if (!res?.data?.token)
      throw new Error("Invalid auth response");

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    closeAuth();
  };

  const register = async (data) => {
    await authApi.register(data);

    closeAuth();
    openSuccess();
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}

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
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem("token"))
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