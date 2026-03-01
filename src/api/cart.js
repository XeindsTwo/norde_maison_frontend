import {api} from "./http";

export const getCart = (currency) =>
  api.get("/cart/", {
    params: {currency}
  });

export const addToCart = (data) =>
  api.post("/cart/add/", data);

export const updateCartItem = (id, data) =>
  api.patch(`/cart/item/${id}/`, data);

export const deleteCartItem = (id) =>
  api.delete(`/cart/item/${id}/delete/`);