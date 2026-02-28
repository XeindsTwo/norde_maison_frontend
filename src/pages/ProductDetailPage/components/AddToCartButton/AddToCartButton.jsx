import "./AddToCartButton.scss";
import {useAuth} from "@/context/AuthContext";

const DELIVERY_THRESHOLD = 6500;

const AddToCartButton = ({
                           product,
                           color,
                           size,
                           quantity = 1,
                         }) => {
  const {isAuth, openAuth} = useAuth();
  const price = Number(product?.price || 0);
  const total = price * Math.max(1, quantity);

  const disabled = !color || !size || quantity <= 0;

  const remainingForFreeDelivery = Math.max(
    0,
    DELIVERY_THRESHOLD - total
  );

  const handleClick = () => {

    if (!isAuth) {
      openAuth();
      return;
    }

    if (disabled) return;

    console.log("Добавлено в корзину", {
      product,
      color,
      size,
      quantity
    });

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

      <div className="delivery-info">
        <p>
          Бесплатная доставка по России при заказе от{" "}
          {DELIVERY_THRESHOLD.toLocaleString("ru-RU")} ₽
        </p>
        <p>
          До бесплатной доставки не хватает{" "}
          {remainingForFreeDelivery.toLocaleString("ru-RU")} ₽
        </p>
        <p>
          Сделайте заказ сегодня — получите его в течение 1–3 дней
        </p>
      </div>

    </div>
  );
};

export default AddToCartButton;