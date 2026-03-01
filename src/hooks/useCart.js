import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";

import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem
} from "@/api/cart";

export const useCart = () => {

  const queryClient = useQueryClient();
  const { isAuth } = useAuth();
  const { currency } = useCurrency();

  const cartQuery = useQuery({
    queryKey: ["cart", currency],
    queryFn: () => getCart(currency),
    enabled: isAuth,
    retry: false
  });

  const invalidateCart = () => {
    queryClient.invalidateQueries({
      queryKey: ["cart"]
    });
  };

  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: invalidateCart
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateCartItem(id, data),
    onSuccess: invalidateCart
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: invalidateCart
  });

  return {
    data: cartQuery.data?.data,
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,

    addToCart: addMutation.mutate,
    updateItem: updateMutation.mutate,
    deleteItem: deleteMutation.mutate,

    refetchCart: cartQuery.refetch
  };
};