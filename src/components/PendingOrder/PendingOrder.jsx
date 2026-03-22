import {useState, useEffect} from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./PendingOrder.scss";
import IomoneyIcon from "@/assets/images/icons/iomoney.svg";

const PendingOrder = ({order, currency, onPayClick, isLoading = false}) => {
  const [secondsLeft, setSecondsLeft] = useState(Number(order?.expires_in_seconds) || 0);

  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [order]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="checkout-pending">
      <p>
        {isLoading ? (
          <Skeleton width={260} height={18} />
        ) : (
          <>У вас есть неоплаченный заказ <strong>#{order.order_number}</strong></>
        )}
      </p>

      <p className="checkout-pending__info">
        {isLoading ? (
          <Skeleton width={200} height={16} />
        ) : (
          <>Сумма к оплате: <strong>{order.total_price.toLocaleString()} {currency.toUpperCase()}</strong></>
        )}
      </p>

      <p className="checkout-pending__timer">
        <span className="checkout-pending__spinner"></span>
        {isLoading ? (
          <Skeleton width={300} height={16} />
        ) : (
          <>Если вы не оплатите заказ в течение {minutes} мин {seconds < 10 ? `0${seconds}` : seconds} сек, он будет отменён</>
        )}
      </p>

      {isLoading ? (
        <Skeleton width={240} height={60} />
      ) : (
        <button className="checkout-form__submit small" onClick={onPayClick}>
          <IomoneyIcon/>
          Оплатить заказ
        </button>
      )}
    </div>
  );
};

export default PendingOrder;