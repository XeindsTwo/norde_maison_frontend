import { api } from './http';

// ===== Категории =====
export const getCategories = (params) =>
    api.get('catalog/categories/', { params });

// ===== Подкатегории =====
export const getSubcategories = (params) =>
    api.get('catalog/subcategories/', { params });

// ===== Каталог товаров подкатегории =====
export const getProducts = (params) =>
    api.get('catalog/products/', {
        params: {
            subcategory: params.subcategory,
            gender: params.gender,
            page: params.page || 1,
            page_size: params.page_size || 16,
            ordering: params.ordering || '-created_at',
            visible: true,
        },
    });

// ===== Детальная карточка товара =====
export const getProductDetail = (id) =>
    api.get(`catalog/products/${id}/`);