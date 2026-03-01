import "./CartRow.scss";
import CartProduct from "../CartProduct/CartProduct";
import CartQuantity from "../CartQuantity/CartQuantity";
import {formatPrice} from "@/utils/formatPrice";

const CartRow = ({
                   item,
                   currency,
                   onDelete,
                   onQuantityChange
                 }) => {

  const unitPrice = Number(item.product_price);
  const totalPrice = unitPrice * item.quantity;

  return (
    <div className="cart-row">

      <div className="cart-row__product">
        <CartProduct
          item={item}
          onDelete={onDelete}
        />

        {!item.is_available && item.availability_message && (
          <p className="cart-row__status">
            {item.availability_message}
          </p>
        )}
      </div>

      <CartQuantity
        value={item.quantity}
        max={5}
        disabled={!item.is_available}
        onChange={(q) => onQuantityChange(item.id, q)}
        onDelete={() => onDelete(item.id)}
      />

      <span className="cart-price">
                {formatPrice(unitPrice, currency)}
            </span>

      <span className="cart-price cart-price--total">
                {formatPrice(totalPrice, currency)}
            </span>

    </div>
  );
};

export default CartRow;