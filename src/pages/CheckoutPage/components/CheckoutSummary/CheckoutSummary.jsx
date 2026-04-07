import {formatPrice, getItemPrice, getCurrencySymbol, convertPrice} from "@/utils/formatPrice";
import "./CheckoutSummary.scss";
import {Link} from "react-router-dom";

const CheckoutSummary = ({
                           items = preview?.items || [],
                           subtotal = getSubtotal(preview || {}, currency) || 0,
                           deliveryPrice,
                           deliveryPriceConverted,
                           currentRegion,
                           deliveryMethod,
                           currency,
                           deliveryCurrency,
                           total
                         }) => {

  const originalDeliveryPrice = currentRegion
    ? deliveryMethod === "cdek_pvz"
      ? Number(currentRegion[`cdek_pvz_price${deliveryCurrency === "rub" ? "" : "_" + deliveryCurrency}`])
      : Number(currentRegion[`cdek_courier_price${deliveryCurrency === "rub" ? "" : "_" + deliveryCurrency}`])
    : 0;

  const deliveryIsFree = deliveryPrice === 0 && originalDeliveryPrice > 0;
  const originalConverted = convertPrice(originalDeliveryPrice, deliveryCurrency, currency);

  return (
    <div className="checkout-summary">
      <ul className="checkout-summary__items">
        {items.map((item, i) => (
          <Link to={`/product/${item.product_id}`} className="checkout-summary__item" key={i}>
            {item.image_url
              ? <img src={item.image_url} alt={item.product_name} className="checkout-summary__image"/>
              : <div className="checkout-summary__image checkout-summary__image--placeholder"/>
            }
            <div className="checkout-summary__info">
              <p className="checkout-summary__name">{item.product_name}</p>
              <p className="checkout-summary__variant">
                Цвет: {item.color} / Размер: {item.size}
              </p>
              <div className="checkout-summary__price mobile">
                <span>{item.quantity} × </span>
                {formatPrice(getItemPrice(item, currency), currency)}
              </div>
            </div>
            <div className="checkout-summary__price">
              <span>{item.quantity} × </span>
              {formatPrice(getItemPrice(item, currency), currency)}
            </div>
          </Link>
        ))}
      </ul>

      <div className="checkout-summary__footer">
        <div className="checkout-summary__footer-left">
          <p className="checkout-summary__total-label">Итого за заказ:</p>
          <div className="checkout-summary__grand">
            <span>{formatPrice(total, currency)}</span>
            {deliveryIsFree && (
              <s className="checkout-summary__grand-old">
                {formatPrice(subtotal + originalConverted, currency)}
              </s>
            )}
          </div>
        </div>

        <ul className="checkout-summary__rows">
          <li className="checkout-summary__row">
            Сумма товаров:&nbsp; <span>{formatPrice(subtotal, currency)}</span>
          </li>
          <li className="checkout-summary__row">
            Доставка:&nbsp;
            <p className="checkout-summary__delivery">
              {deliveryIsFree ? (
                <>
                  <span>0 {getCurrencySymbol(currency)}</span>
                  <span>{formatPrice(originalConverted, currency)}</span>
                </>
              ) : (
                formatPrice(deliveryPriceConverted, currency)
              )}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CheckoutSummary;