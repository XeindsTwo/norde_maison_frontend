import FavoriteIcon from "@/assets/images/icons/bx_star.svg";
import {useAuth} from "@/context/AuthContext";
import {useFavorites} from "@/hooks/useFavorites";

const FavoriteButton = ({
                          productId,
                          className="",
                          iconClassName="",
                          onRemove
                        }) => {

  const {isAuth, openAuth} = useAuth();
  const {isFavorite, toggle} = useFavorites(isAuth);

  const favorite = isFavorite(productId);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      openAuth();
      return;
    }

    toggle(productId);

    if (favorite && onRemove) {
      onRemove();
    }
  };

  const iconClasses = [iconClassName, favorite ? "active" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={className} onClick={handleClick}>
      <FavoriteIcon className={iconClasses}/>
    </button>
  );
};

export default FavoriteButton;