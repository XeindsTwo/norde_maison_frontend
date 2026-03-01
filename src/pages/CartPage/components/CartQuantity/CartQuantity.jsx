import "./CartQuantity.scss";
import IconCross from "@/assets/images/icons/cross-cart.svg";

const CartQuantity = ({ value, onChange, max, onDelete }) => {
  return (
    <div className="cart-quantity">
      <div className="cart-quantity__top">
        <button
          className="cart-quantity__element"
          disabled={value <= 1}
          onClick={() => value > 1 && onChange(value - 1)}
        >
          −
        </button>

        <span className="cart-quantity__element counter">
          {value}
        </span>

        <button
          className="cart-quantity__element"
          disabled={value >= max}
          onClick={() => value < max && onChange(value + 1)}
        >
          +
        </button>
      </div>

      <button
        className="cart-quantity__delete"
        onClick={onDelete}
      >
        <IconCross />
        Удалить
      </button>
    </div>
  );
};

export default CartQuantity;