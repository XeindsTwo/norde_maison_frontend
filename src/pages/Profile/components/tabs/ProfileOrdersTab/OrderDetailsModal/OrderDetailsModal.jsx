import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import AssemblyIcon from "@/assets/images/icons/orders/assembly.svg";
import InWayIcon from "@/assets/images/icons/orders/in_way.svg";
import DeliveredIcon from "@/assets/images/icons/orders/delivered.svg";
import CancelledIcon from "@/assets/images/icons/orders/cancelled.svg";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";
import "./OrderDetailsModal.scss";
import {formatPrice, convertPrice} from "@/utils/formatPrice";
import {Link} from "react-router-dom";

const OrderDetailsModal = ({order, currency = "rub", onClose}) => {
  if (!order) return null;

  const getPrice = (field) => {
    const map = {
      rub: field,
      kzt: `${field}_kzt`,
      byn: `${field}_byn`
    };
    return order[map[currency]] || order[field];
  };

  const getStatusLabel = (status) => ({
    assembly: "В сборке",
    in_way: "В пути",
    delivered: "Доставлен",
    cancelled: "Отменен"
  }[status] || "В сборке");

  const getStatusIcon = (status) => {
    switch (status) {
      case "assembly":
        return <AssemblyIcon/>;
      case "in_way":
        return <InWayIcon/>;
      case "delivered":
        return <DeliveredIcon/>;
      case "cancelled":
        return <CancelledIcon/>;
      default:
        return <AssemblyIcon/>;
    }
  };

  const getDeliveryLabel = (method) => ({
    cdek_pvz: "В пункт выдачи CDEK",
    cdek_courier: "Курьер CDEK"
  }[method] || method);

  const items = Array.isArray(order.items) ? order.items : [];

  const itemsTotal = items.reduce((sum, i) => {
    const priceRub = parseFloat(i.price_snapshot || 0);
    const converted = convertPrice(priceRub, "rub", currency);
    return sum + converted * (i.quantity || 0);
  }, 0);

  return (
    <AnimatedModal isOpen={true} onClose={onClose} width="654px">
      <div className="modal__top">
        <div className="modal__title small">
          Заказ №{order.order_number || 'N/A'} от {order.created_at || 'N/A'}
        </div>
        <button className="modal__close" onClick={onClose}>
          <CrossArrow/>
        </button>
      </div>

      <div className="modal__inner">
        <div className="order-modal__status">
          {getStatusIcon(order.status)}
          <span>{getStatusLabel(order.status)}</span>
        </div>

        <div className="order-modal__content">
          <ul className="order-modal__items">
            {items.map((item, index) => (
              <Link
                key={`order-${order.order_number}-${item.product_id || index}`}
                to={`/product/${item.product_id || ''}`}
                className="order-modal__item"
                target="_blank"
              >
                <img
                  src={item.main_image || ''}
                  alt={item.product_name || ''}
                  className="order-modal__item-image"
                />
                <div className="order-modal__item-info">
                  <p className="order-modal__name">{item.product_name || 'N/A'}</p>
                  <p className="order-modal__variant">
                    Цвет: {item.color || 'N/A'} / Размер: {item.size || 'N/A'}
                  </p>
                  <p className="order-modal__price mobile">
                    <span>{item.quantity || 0} × </span>
                    {formatPrice(convertPrice(item.price_snapshot || 0, "rub", currency), currency)}
                  </p>
                </div>
                <p className="order-modal__price">
                  <span>{item.quantity || 0} × </span>
                  {formatPrice(convertPrice(item.price_snapshot || 0, "rub", currency), currency)}
                </p>
              </Link>
            ))}
          </ul>

          <div className="order-modal__totals">
            <div className="order-modal__totals-main">
              <div className="order-modal__label">Итого:</div>
              {order.delivery_price > 0 && (
                <p className="order-modal__price-old">
                  {formatPrice(itemsTotal, currency)}
                </p>
              )}
              <p className="order-modal__price-current">
                {formatPrice(getPrice("total_price"), currency)}
              </p>
            </div>

            <div className="order-modal__totals-details">
              <div className="order-modal__totals-row">
                <span>Сумма товаров:</span>
                <p className="order-modal__totals-value">
                  {formatPrice(itemsTotal, currency)}
                </p>
              </div>

              <div className="order-modal__totals-row">
                <span>Доставка:</span>
                <div className="order-modal__totals-value">
                  {getPrice("delivery_price") > 0
                    ? formatPrice(getPrice("delivery_price"), currency)
                    : formatPrice(0, currency)}
                </div>
              </div>
            </div>
          </div>

          <ul className="order-modal__delivery-info">
            <li><strong>Доставка:</strong> {getDeliveryLabel(order.delivery_method)}</li>
            <li><strong>ФИО:</strong> {order.last_name} {order.first_name} {order.middle_name || ''}</li>
            {order.phone && <li><strong>Номер:</strong> {order.phone}</li>}
            {order.telegram && <li><strong>Telegram:</strong> {order.telegram}</li>}
            {order.address && <li><strong>Адрес:</strong> {order.address}</li>}
            {order.comment?.trim() && <li><strong>Комментарий:</strong> {order.comment}</li>}
          </ul>
        </div>
      </div>
    </AnimatedModal>
  );
};

export default OrderDetailsModal;