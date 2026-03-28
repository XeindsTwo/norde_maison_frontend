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

export const getUserOrders = (params = {}) =>
  api.get("auth/orders/", {params});

export const getPendingOrder = () =>
  api.get("orders/checkout/current-pending/");

export const resetPasswordRequest = (data) =>
  api.post("auth/password-reset/", data);

export const resetPasswordConfirmNewPassword = (token, data) =>
  api.post(`auth/password-reset-confirm/${token}/`, data);