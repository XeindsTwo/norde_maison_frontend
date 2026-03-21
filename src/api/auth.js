import {api} from "./http";

export const register = (data) =>
  api.post("auth/register/", data);

export const login = (data) =>
  api.post("auth/login/", data);

export const getMe = () =>
  api.get("auth/me/");

export const logout = () =>
  api.post("auth/logout/");

export const updateProfile = (data) =>
  api.patch("auth/me/", data);

export const changePassword = (data) =>
  api.post("auth/change-password/", data);

export const getUserOrders = () =>
  api.get("auth/orders/");

export const getPendingOrder = () =>
  api.get("orders/checkout/current-pending/");