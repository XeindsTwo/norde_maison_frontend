import {useState} from "react";
import FavoriteIcon from "@/assets/images/icons/bx_star.svg";
import {useAuth} from "@/context/AuthContext";
import {toggleFavorite} from "@/api/favorite";
import {useQueryClient} from "@tanstack/react-query";
import {showNotification} from "@/components/Notification/Notification";

const FavoriteButton = ({
                          productId,
                          className = "",
                          iconClassName = "",
                          isFavorite = false
                        }) => {

  const {isAuth, openAuth} = useAuth();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!isAuth) {
      openAuth();
      return;
    }

    try {
      setLoading(true);

      const res = await toggleFavorite(productId);

      const newState = res.data.favorite;

      setFavorite(newState);

      queryClient.invalidateQueries({
        queryKey: ["favorites"]
      });

      showNotification({
        title: "Избранное",
        message: newState
          ? "Товар добавлен в избранное"
          : "Товар удалён из избранного",
        type: "success"
      });

    } catch {
      showNotification({
        title: "Ошибка",
        message: "Не удалось обновить избранное",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      <FavoriteIcon className={favorite ? iconClassName + " active" : iconClassName}/>
    </button>
  );
};

export default FavoriteButton;