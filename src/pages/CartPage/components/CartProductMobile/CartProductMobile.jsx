import {Link} from "react-router-dom";
import {formatPrice} from "@/utils/formatPrice";
import "./CartProductMobile.scss";
import IconCross from "@/assets/images/icons/cross-cart.svg";

const CartProductMobile = ({item, currency, onQuantityChange, onDelete, isFirst}) => {
  if (!item) return null;

  const unitPrice = Number(item.product_price);
  const totalPrice = unitPrice * item.quantity;

  return (
    <div className={`cart-product-mobile ${isFirst ? 'cart-product-mobile--first' : ''}`}>
      <img
        src={item.product_image_url}
        alt={item.product_name}
        className="cart-product-mobile__image"
      />

      <div className="cart-product-mobile__content">
        <p className="cart-product-mobile__price mobile">
          <span>{formatPrice(totalPrice, currency)}</span>
          {item.availability_message && (
            <p className="cart-product-mobile__status">{item.availability_message}</p>
          )}
        </p>
        <div className="cart-product-mobile__info">
          <h3 className="cart-product-mobile__name">
            <Link to={`/product/${item.product_id}`} className="cart-product-mobile__link">
              {item.product_name}
            </Link>
          </h3>
        </div>
        <div className="cart-product-mobile__variants">
          <p className="cart-product-mobile__variant">
            <span className="cart-product-mobile__label">Размер: </span>
            <span>{item.size}</span>
          </p>
          <svg width="1" height="15" viewBox="0 0 1 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15V0H1V15H0Z" fill="#111111" fill-opacity="0.34"/>
          </svg>
          <p className="cart-product-mobile__variant">
            <span className="cart-product-mobile__label">Цвет: </span>
            <span>{item.color}</span>
          </p>
        </div>
        <div className="cart-product-mobile__controls">
          <div className="cart-quantity cart-quantity--mobile">
            <div className="cart-quantity__top">
              <button
                className="cart-quantity__element"
                disabled={item.quantity <= 1}
                onClick={() => item.quantity > 1 && onQuantityChange(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span className="cart-quantity__element counter">{item.quantity}</span>
              <button
                className="cart-quantity__element"
                disabled={item.quantity >= 5 || !item.is_available}
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="cart-quantity__delete" onClick={() => onDelete(item.id)}>
              <IconCross/>
              Удалить
            </button>
          </div>
        </div>
      </div>

      <p className="cart-product-mobile__price">
        <span>{formatPrice(totalPrice, currency)}</span>
        {item.availability_message && (
          <p className="cart-product-mobile__status">{item.availability_message}</p>
        )}
      </p>
    </div>
  );
};

export default CartProductMobile;