import {useEffect} from "react";
import {formatPrice, getCurrencySymbol, convertPrice} from "@/utils/formatPrice";
import "./CheckoutDelivery.scss";
import CdekIcon from "@/assets/images/icons/cdek.svg";

const COUNTRY_LABELS = {RU: "Российская Федерация", KZ: "Казахстан", BY: "Беларусь"};

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

const CheckoutDelivery = ({regions, delivery, subtotal, currency, deliveryCurrency, onChange}) => {
  const currentRegion = regions.find(r => r.code === delivery.country);
  const prices = getMethodPrices(currentRegion, deliveryCurrency);

  useEffect(() => {
    if (regions.length && !regions.find(r => r.code === delivery.country)) {
      onChange({...delivery, country: regions[0].code});
    }
  }, [regions]);

  return (
    <section className="checkout-delivery">
      <h2 className="checkout-delivery__title">Доставка</h2>

      <div className="checkout-page__field">
        <label className="checkout-page__label">Страна</label>
        <div className="checkout-delivery__select-wrap">
          <select
            className="checkout-page__input"
            value={delivery.country}
            onChange={e => onChange({...delivery, country: e.target.value})}
          >
            {regions.map(r => (
              <option key={r.code} value={r.code}>
                {COUNTRY_LABELS[r.code] || r.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="checkout-page__field">
        <label className="checkout-page__label">Способ доставки</label>
        <div className="checkout-delivery__methods">
          <button
            type="button"
            className={`checkout-delivery__method ${delivery.method === "cdek_pvz" ? "checkout-delivery__method--active" : ""}`}
            onClick={() => onChange({...delivery, method: "cdek_pvz"})}
          >
            <CdekIcon className="checkout-delivery__icon"/>
            <div className="checkout-delivery__method-name">В пункт выдачи CDEK</div>
            <div className="checkout-delivery__method-time">1-3 рабочих дня</div>
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
            <div className="checkout-delivery__method-name">Курьером CDEK по адресу</div>
            <div className="checkout-delivery__method-time">1-3 рабочих дня</div>
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

      <div className="checkout-page__field">
        <label className="checkout-page__label">
          {delivery.method === "cdek_courier" ? "Адрес доставки" : "Адрес пункта выдачи"}
        </label>
        <input
          className="checkout-page__input"
          placeholder="г. Москва, Варшавское шоссе, 16, дом 5А"
          name="address"
        />
      </div>

      <div className="checkout-page__field">
        <label className="checkout-page__label">
          Комментарий <span className="checkout-delivery__optional">(опционально)</span>
        </label>
        <textarea
          className="checkout-page__input checkout-page__textarea"
          placeholder="Ваше сообщение"
          rows={4}
          name="comment"
        />
      </div>

      <label className="checkout-delivery__checkbox">
        <input type="checkbox" name="save_address"/>
        <span>Сохранить адрес доставки</span>
      </label>
    </section>
  );
};

export default CheckoutDelivery;