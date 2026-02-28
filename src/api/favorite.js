import {api} from "./http";

export const toggleFavorite = (productId) =>
  api.post("favorites/toggle/", {
    product_id: productId
  });

export const getFavorites = () =>
  api.get("favorites/");