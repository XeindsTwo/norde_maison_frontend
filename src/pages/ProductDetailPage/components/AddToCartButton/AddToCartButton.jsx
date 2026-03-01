import "./AddToCartButton.scss";
import {useAuth} from "@/context/AuthContext";
import {useCart} from "@/hooks/useCart";
import {showNotification} from "@/components/Notification/Notification";
import {normalizeHex} from "@/utils/color";

const MAX_PER_ITEM = 5;

const AddToCartButton = ({
                           product,
                           color,
                           size,
                           quantity = 1,
                           variant,
                           limitReached
                         }) => {

  const {isAuth, openAuth} = useAuth();
  const {addToCart} = useCart();

  if (!product) return null;

  const disabled =
    !variant ||
    !color ||
    !size ||
    quantity < 1 ||
    limitReached;

  const handleClick = () => {

    if (!isAuth) {
      openAuth();
      return;
    }

    if (disabled) return;

    addToCart(
      {
        variant: variant.id,
        quantity
      },
      {
        onSuccess: () => {

          showNotification({
            title: product?.name || "Товар",
            message: "Добавлено в корзину",
            type: "success"
          });

        }
      }
    );
  };

  return (
    <div className="add-to-cart-wrapper">

      <button
        className="add-to-cart-button"
        disabled={disabled}
        onClick={handleClick}
      >
        Добавить в корзину
      </button>

    </div>
  );
};

export default AddToCartButton;