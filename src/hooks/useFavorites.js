import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFavorites, toggleFavorite } from "@/api/favorite";
import { useAuth } from "@/context/AuthContext";
import { showNotification } from "@/components/Notification/Notification";

export const useFavorites = () => {
  const { isAuth, loadingUser, openAuth } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: isAuth && !loadingUser,
    refetchOnWindowFocus: false,
    staleTime: 0
  });

  const mutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: async response => {
      const favoriteState = response?.data?.favorite;

      await queryClient.refetchQueries({
        queryKey: ["favorites"],
        exact: true
      });

      showNotification({
        title: "Избранное",
        message: favoriteState
          ? "Товар добавлен в избранное"
          : "Товар удалён из избранного",
        type: "success"
      });
    },
    onError: () => {
      showNotification({
        title: "Ошибка",
        message: "Не удалось обновить избранное",
        type: "error"
      });
    }
  });

  const toggle = productId => {
    if (!isAuth) {
      openAuth();
      return;
    }

    mutation.mutate(productId);
  };

  const isFavorite = productId => {
    if (loadingUser) return false;

    const list = query.data?.data;
    if (!Array.isArray(list)) return false;

    return list.some(f => String(f?.product?.id) === String(productId));
  };

  return {
    favorites: query.data?.data || [],
    isFavorite,
    toggle,
    loading: query.isLoading || mutation.isPending
  };
};
