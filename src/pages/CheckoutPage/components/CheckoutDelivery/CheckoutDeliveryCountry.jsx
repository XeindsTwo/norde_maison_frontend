import "./CheckoutDelivery.scss";
import {useEffect} from "react";

const COUNTRY_LABELS = {RU: "Российская Федерация", KZ: "Казахстан", BY: "Беларусь"};

const CheckoutDeliveryCountry = ({regions, delivery, onChange}) => {
  useEffect(() => {
    if (regions.length && !regions.find(r => r.code === delivery.country)) {
      onChange({...delivery, country: regions[0].code});
    }
  }, [regions]);

  return (
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
  );
};

export default CheckoutDeliveryCountry;