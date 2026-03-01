import FavoriteIcon from "@/assets/images/icons/bx_star.svg";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";

const FavoriteButton = ({
                          productId,
                          className = "",
                          iconClassName = ""
                        }) => {
  const { isAuth, openAuth } = useAuth();
  const { isFavorite, toggle } = useFavorites();

  const favorite = isFavorite(productId);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      openAuth();
      return;
    }

    toggle(productId);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
    >
      <FavoriteIcon
        className={`${iconClassName} ${favorite ? "active" : ""}`.trim()}
      />
    </button>
  );
};

export default FavoriteButton;