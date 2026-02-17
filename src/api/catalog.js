import {api} from './http';

export const getCategories = (params) =>
  api.get('catalog/categories/', {params});

export const getSubcategories = (params) =>
  api.get('catalog/subcategories/', {params});