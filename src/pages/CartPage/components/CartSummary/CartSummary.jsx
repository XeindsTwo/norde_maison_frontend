import {Link} from "react-router-dom";
import "./CartSummary.scss";
import {formatPrice} from "@/utils/formatPrice";

const CartSummary = ({cart, currency, hasUnavailable}) => {

  if (!cart) return null;

  const total = Number(cart.total_price) || 0;
  const isDisabled = total <= 0 || hasUnavailable;

  return (
    <div className="cart-summary">

      <p className="cart-summary__total">
        Итого: <span>{formatPrice(total, currency)}</span>
      </p>

      {hasUnavailable && (
        <p className="cart-summary__warning">
          Некоторые товары недоступны. Удалите их, чтобы продолжить
        </p>
      )}

      {isDisabled ? (
        <button className="cart-summary__btn btn" disabled>
          Перейти к оформлению
        </button>
      ) : (
        <Link to="/checkout" className="cart-summary__btn btn">
          Перейти к оформлению
        </Link>
      )}

    </div>
  );
};

export default CartSummary;