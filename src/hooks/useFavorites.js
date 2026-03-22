import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFavorites, toggleFavorite } from "@/api/favorite";
import { showNotification } from "@/components/Notification/Notification";

export const useFavorites = (isAuth, options = {}) => {
  const { skipInvalidate = false } = options;
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: !!isAuth,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (response, productId) => {
      const favoriteState = response?.data?.favorite;

      if (!skipInvalidate) {
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      } else {
        queryClient.setQueryData(["favorites"], (old) => {
          if (!old) return old;

          const current = old?.data?.data ?? [];

          let updated;

          if (favoriteState) {
            updated = current;
          } else {
            updated = current.filter(
              (item) =>
                String(item?.product?.id) !== String(productId)
            );
          }

          return {
            ...old,
            data: {
              ...old.data,
              data: updated,
            },
          };
        });
      }

      showNotification({
        title: "Избранное",
        message: favoriteState
          ? "Товар добавлен в избранное"
          : "Товар удалён из избранного",
        type: "success",
      });
    },
  });

  const favorites = query.data?.data?.data ?? [];

  const isFavorite = (productId) =>
    favorites.some(
      (item) => String(item?.product?.id) === String(productId)
    );

  return {
    favorites,
    isFavorite,
    toggle: mutation.mutate,
    isLoading: query.isFetching || mutation.isPending,
    mutation,
  };
};