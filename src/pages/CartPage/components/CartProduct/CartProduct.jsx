import {Link} from "react-router-dom";
import "./CartProduct.scss";

const CartProduct = ({item}) => {

  if (!item) return null;

  return (
    <div className="cart-product">

      <img
        src={item.product_image_url}
        alt={item.product_name}
        className="cart-product__image"
      />

      <div className="cart-product__info">

        <h3 className="cart-product__name">
          <Link
            to={`/product/${item.product_id}`}
            className="cart-product__link"
          >
            {item.product_name}
          </Link>
        </h3>

        <div className="cart-product__bottom">
          <p className="cart-product__variant">
            Размер: <span>{item.size}</span>
          </p>

          <p className="cart-product__variant">
            Цвет: <span>{item.color}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default CartProduct;