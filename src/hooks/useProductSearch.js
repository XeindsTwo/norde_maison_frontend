import {useQuery} from "@tanstack/react-query";
import {searchProducts} from "@/api/catalog";

const PAGE_SIZE = 16;

export const useProductSearch = (params) => {

  const query = typeof params === "string"
    ? params
    : params?.q || "";

  const normalizedQuery = String(query || "").trim();

  const queryParams = {
    q: normalizedQuery,
    page: params?.page || 1,
    page_size: params?.page_size || PAGE_SIZE,
    size: params?.size || [],
    color: params?.color || [],
    min_price: params?.min_price,
    max_price: params?.max_price,
    sort: params?.sort
  };

  return useQuery({
    queryKey: ["search-products", queryParams],
    enabled: !!normalizedQuery,

    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,

    queryFn: async () => {
      const res = await searchProducts(queryParams);
      return res.data;
    }
  });
};