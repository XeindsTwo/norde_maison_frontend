import {api} from "./http";

export const getOrderPreview = () => api.get("orders/preview/");
export const createOrder = (data) => api.post("orders/checkout/payment/", data);
export const getOrderHistory = () => api.get("orders/history/");

export const createYooKassaPayment = (orderId) => api.post(`orders/${orderId}/yookassa/`);
export const checkYooKassaPayment = (orderId) => api.get(`orders/${orderId}/yookassa-status/`);