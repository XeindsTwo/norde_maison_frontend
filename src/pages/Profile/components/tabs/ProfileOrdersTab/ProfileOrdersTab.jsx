import Skeleton from "react-loading-skeleton";
import PendingOrder from "@/components/PendingOrder/PendingOrder.jsx";
import AssemblyIcon from "@/assets/images/icons/orders/assembly.svg";
import InWayIcon from "@/assets/images/icons/orders/in_way.svg";
import DeliveredIcon from "@/assets/images/icons/orders/delivered.svg";
import CancelledIcon from "@/assets/images/icons/orders/cancelled.svg";
import "./ProfileOrdersTab.scss";

const ProfileOrdersTab = ({ orders = [], isLoading, onOrderClick, pendingOrder, currency = "rub" }) => {

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "assembly": return <AssemblyIcon />;
      case "in_way": return <InWayIcon />;
      case "delivered": return <DeliveredIcon />;
      case "cancelled": return <CancelledIcon />;
      default: return <AssemblyIcon />;
    }
  };

  const getStatusLabel = (status) => ({
    assembly: "В сборке",
    in_way: "В пути",
    delivered: "Доставлен",
    cancelled: "Отменен"
  }[status] || "В сборке");

  if (isLoading) {
    return (
      <div className="orders-tab">
        <div className="orders-tab__list">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="order">
              <div className="order__content">
                <div className="order__left">
                  <Skeleton width={140} />
                  <Skeleton width={100} />
                  <Skeleton width={120} />
                </div>
                <div className="order__images">
                  {Array(5).fill(0).map((_, j) => <Skeleton key={j} width={60} height={60} style={{ marginRight: 8 }} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="orders-tab">
      {pendingOrder && (
        <PendingOrder
          order={pendingOrder}
          currency={currency}
          onPayClick={() => window.location.href = pendingOrder.payment_url}
        />
      )}

      {orders.length ? (
        <div className="orders-tab__list">
          {orders.map(order => (
            <div key={order.id} className="order" onClick={() => onOrderClick(order)}>
              <div className="order__content">
                <div className="order__left">
                  <div className="order__date">Заказ от {order.created_at}</div>
                  <div className="order__price">{parseFloat(order.total_price).toLocaleString()} ₽</div>
                  <div className="order__status">
                    <StatusIcon status={order.status} />
                    <span>{getStatusLabel(order.status)}</span>
                  </div>
                </div>
                <div className="order__images">
                  {order.items?.slice(0, 5).map((item, i) => (
                    <img key={item.product_id || i} src={item.main_image} alt={item.product_name} className="order__image" />
                  ))}
                  {order.items?.length > 5 && <div className="order__more">+{order.items.length - 5}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>У вас пока нет оплаченных заказов</p>
      )}
    </div>
  );
};

export default ProfileOrdersTab;