import {useCurrency} from "@/context/CurrencyContext";

const DELIVERY_THRESHOLD_MAP = {
  rub: 6500,
  kzt: 30000,
  byn: 220
};

const CURRENCY_SYMBOL_MAP = {
  rub: "₽",
  kzt: "₸",
  byn: "Br"
};

const ProductDeliveryInfo = ({
                               price = 0,
                               quantity = 1
                             }) => {

  const {currency = "rub"} = useCurrency() || {};

  const threshold = DELIVERY_THRESHOLD_MAP[currency] ?? 6500;
  const symbol = CURRENCY_SYMBOL_MAP[currency] ?? "₽";

  const total = price * quantity;
  const remaining = Math.max(0, threshold - total);

  return (
    <div className="delivery-info">

      {remaining > 0 ? (
        <>
          <p>
            Бесплатная доставка при заказе от{" "}
            {threshold.toLocaleString("ru-RU")} {symbol}
          </p>

          <p>
            До бесплатной доставки не хватает{" "}
            {remaining.toLocaleString("ru-RU")} {symbol}
          </p>
        </>
      ) : (
        <p>
          Бесплатная доставка доступна для вашего заказа!
        </p>
      )}

      <p>
        Сделайте заказ сегодня — получите его в течение 1–3 дней
      </p>

    </div>
  );
};

export default ProductDeliveryInfo;