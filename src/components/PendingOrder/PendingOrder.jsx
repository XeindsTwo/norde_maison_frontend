import {useState, useEffect} from "react";
import "./PendingOrder.scss";
import IomoneyIcon from "@/assets/images/icons/iomoney.svg";

const PendingOrder = ({order, currency, onPayClick}) => {
  const [secondsLeft, setSecondsLeft] = useState(Number(order.expires_in_seconds) || 0);

  useEffect(() => {
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
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="checkout-pending">
      <p>У вас есть неоплаченный заказ <strong>#{order.order_number}</strong></p>
      <p className="checkout-pending__info">
        Сумма к оплате: <strong>{order.total_price.toLocaleString()} {currency.toUpperCase()}</strong>
      </p>
      <p className="checkout-pending__timer">
        <span className="checkout-pending__spinner"></span>
        Если вы не оплатите заказ в течение {minutes} мин {seconds < 10 ? `0${seconds}` : seconds} сек, он будет отменён
      </p>
      <button className="checkout-form__submit small" onClick={onPayClick}>
        <IomoneyIcon/>
        Оплатить заказ
      </button>
    </div>
  );
};

export default PendingOrder;