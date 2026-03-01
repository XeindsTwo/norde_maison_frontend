import "./CartSummary.scss";
import {formatPrice} from "@/utils/formatPrice";

const CartSummary = ({cart, currency}) => {

  if (!cart) return null;

  const total = Number(cart.total_price) || 0;
  const isDisabled = total <= 0;

  return (
    <div className="cart-summary">

      <p className="cart-summary__total">
        Итого: <span>{formatPrice(total, currency)}</span>
      </p>

      <button
        className="cart-summary__btn btn"
        disabled={isDisabled}
      >
        Перейти к оформлению
      </button>

    </div>
  );
};

export default CartSummary;