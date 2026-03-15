import {formatPrice, getCurrencySymbol, convertPrice} from "@/utils/formatPrice";
import CdekIcon from "@/assets/images/icons/cdek.svg";

const getMethodPrices = (region, deliveryCurrency) => {
  if (!region) return {pvz: 0, pvz_free: 0, courier: 0, courier_free: 0};
  if (deliveryCurrency === "kzt") return {
    pvz: Number(region.cdek_pvz_price_kzt),
    pvz_free: Number(region.cdek_pvz_free_from_kzt),
    courier: Number(region.cdek_courier_price_kzt),
    courier_free: Number(region.cdek_courier_free_from_kzt),
  };
  if (deliveryCurrency === "byn") return {
    pvz: Number(region.cdek_pvz_price_byn),
    pvz_free: Number(region.cdek_pvz_free_from_byn),
    courier: Number(region.cdek_courier_price_byn),
    courier_free: Number(region.cdek_courier_free_from_byn),
  };
  return {
    pvz: Number(region.cdek_pvz_price),
    pvz_free: Number(region.cdek_pvz_free_from),
    courier: Number(region.cdek_courier_price),
    courier_free: Number(region.cdek_courier_free_from),
  };
};

const DeliveryMethodPrice = ({price, freeFrom, subtotal, currency, deliveryCurrency}) => {
  const symbol = getCurrencySymbol(currency);
  const priceConverted = convertPrice(price, deliveryCurrency, currency);
  const freeFromConverted = convertPrice(freeFrom, deliveryCurrency, currency);

  if (subtotal >= freeFromConverted) {
    return <><b>0 {symbol}</b> <s>{formatPrice(priceConverted, currency)}</s></>;
  }
  return <b>{formatPrice(priceConverted, currency)}</b>;
};

const CheckoutDeliveryMethods = ({regions, delivery, subtotal, currency, deliveryCurrency, onChange}) => {
  const currentRegion = regions.find(r => r.code === delivery.country);
  const prices = getMethodPrices(currentRegion, deliveryCurrency);
  const isInternational = delivery.country !== "RU";
  const timeLabel = isInternational ? "3–7 рабочих дней" : "1–3 рабочих дня";

  return (
    <div className="checkout-page__field">
      <label className="checkout-page__label">Способ доставки</label>
      <div className="checkout-delivery__methods">
        <button
          type="button"
          className={`checkout-delivery__method ${delivery.method === "cdek_pvz" ? "checkout-delivery__method--active" : ""}`}
          onClick={() => onChange({...delivery, method: "cdek_pvz"})}
        >
          <CdekIcon className="checkout-delivery__icon"/>
          <div className="checkout-delivery__method-name">
            В пункт выдачи CDEK {isInternational && <span className="checkout-delivery__method-intl">(Международный)</span>}
          </div>
          <div className="checkout-delivery__method-time">{timeLabel}</div>
          <div className="checkout-delivery__method-price">
            <DeliveryMethodPrice
              price={prices.pvz}
              freeFrom={prices.pvz_free}
              subtotal={subtotal}
              currency={currency}
              deliveryCurrency={deliveryCurrency}
            />
          </div>
        </button>

        <button
          type="button"
          className={`checkout-delivery__method ${delivery.method === "cdek_courier" ? "checkout-delivery__method--active" : ""}`}
          onClick={() => onChange({...delivery, method: "cdek_courier"})}
        >
          <CdekIcon className="checkout-delivery__icon"/>
          <div className="checkout-delivery__method-name">
            Курьером CDEK по адресу {isInternational && <span className="checkout-delivery__method-intl">(Международный)</span>}
          </div>
          <div className="checkout-delivery__method-time">{timeLabel}</div>
          <div className="checkout-delivery__method-price">
            <DeliveryMethodPrice
              price={prices.courier}
              freeFrom={prices.courier_free}
              subtotal={subtotal}
              currency={currency}
              deliveryCurrency={deliveryCurrency}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CheckoutDeliveryMethods;