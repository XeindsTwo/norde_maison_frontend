import {api} from "./http";

export const getOrderPreview = () => api.get("orders/preview/");
export const createOrder = (data) => api.post("orders/checkout/", data);
export const getOrderHistory = () => api.get("orders/history/");