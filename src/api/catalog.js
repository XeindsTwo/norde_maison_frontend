import {api} from './http';

// Категории
export const getCategories = (params) =>
  api.get('catalog/categories/', {params});

// Подкатегории
export const getSubcategories = (params) =>
  api.get('catalog/subcategories/', {params});

// Товары подкатегории
export const getProducts = (params) => {
  const urlParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => urlParams.append(key, v));
    } else if (value !== undefined && value !== null && value !== "") {
      urlParams.set(key, value);
    }
  });

  return api.get("catalog/products/?" + urlParams.toString());
};

// Детальная подкатегория
export const getSubcategoryDetail = (id) =>
  api.get(`catalog/subcategories/${id}/`);

export const getProductDetail = (id) =>
  api.get(`catalog/products/${id}/`);