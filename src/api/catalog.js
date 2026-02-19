// src/api/catalog.js
import { api } from './http';

// КАТЕГОРИИ
export const getCategories = (params) =>
  api.get('catalog/categories/', { params });

// ПОДКАТЕГОРИИ
export const getSubcategories = (params) =>
  api.get('catalog/subcategories/', { params });

// ТОВАРЫ (СПИСОК / КАТАЛОГ)
// params могут содержать: subcategory, category, gender, visible и т.д.
export const getProducts = (params) =>
  api.get('catalog/products/', { params });

// ОДИН ТОВАР (ДЕТАЛЬНАЯ КАРТОЧКА)
export const getProductDetail = (id) =>
  api.get(`catalog/products/${id}/`);