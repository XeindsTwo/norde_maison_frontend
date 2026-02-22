import {api} from './http';

// Категории
export const getCategories = (params) =>
  api.get('catalog/categories/', {params});

// Подкатегории
export const getSubcategories = (params) =>
  api.get('catalog/subcategories/', {params});

// Товары подкатегории
export const getProducts = (params) =>
  api.get('catalog/products/', {
    params: {
      subcategory: params.subcategory,
      page: params.page || 1,
      page_size: params.page_size || 16,
      ordering: params.ordering || '-created_at',
      visible: true,
    },
  });

// Детальная подкатегория
export const getSubcategoryDetail = (id) =>
  api.get(`catalog/subcategories/${id}/`);

export const getProductDetail = (id) =>
  api.get(`catalog/products/${id}/`);