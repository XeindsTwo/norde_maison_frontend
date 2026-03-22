import FavoriteIcon from "@/assets/images/icons/bx_star.svg";
import {useAuth} from "@/context/AuthContext";
import {useFavorites} from "@/hooks/useFavorites";

const FavoriteButton = ({
                          productId,
                          className = "",
                          iconClassName = "",
                          onRemove,
                          isFavorite: externalIsFavorite,
                          toggle: externalToggle,
                          label,
                        }) => {
  const {isAuth, openAuth} = useAuth();

  const useExternal = externalIsFavorite && externalToggle;

  const {isFavorite, toggle} = useExternal
    ? {isFavorite: externalIsFavorite, toggle: externalToggle}
    : useFavorites(isAuth);

  const favorite = isFavorite(productId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      openAuth();
      return;
    }

    if (onRemove) {
      onRemove(productId);
      return;
    }

    toggle(productId);
  };

  const iconClasses = [iconClassName, favorite ? "active" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={className} onClick={handleClick}>
      <FavoriteIcon className={iconClasses}/>
      {label && <span className="favorite-button__label">{label}</span>}
    </button>
  );
};

export default FavoriteButton;