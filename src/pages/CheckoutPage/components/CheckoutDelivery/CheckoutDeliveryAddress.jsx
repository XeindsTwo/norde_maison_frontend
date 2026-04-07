import "./CheckoutDelivery.scss";
import AddressField from "@/components/AddressField/AddressField.jsx";

const CheckoutDeliveryAddress = ({delivery, register, errors, watch, setValue}) => {
  const addressWatch = watch?.("address");
  const isCourier = delivery.method === "cdek_courier";

  return (
    <>
      <div className="checkout-page__field">
        <label className="checkout-page__label">
          {isCourier ? "Адрес доставки" : "Адрес пункта выдачи"}
        </label>
        <AddressField
          value={addressWatch || ""}
          onChange={value => setValue("address", value)}
          name="address"
          inputProps={{
            className: `checkout-page__input ${errors?.address ? "checkout-page__input--error" : ""}`,
            placeholder: "г. Москва, Варшавское шоссе, 16, дом 5А"
          }}
        />
        {errors?.address && (
          <span className="checkout-page__error">{errors.address.message}</span>
        )}
      </div>

      {isCourier && (
        <div className="checkout-delivery__extra-row">
          <div className="checkout-page__field">
            <label className="checkout-page__label top">Подъезд/Дом</label>
            <input
              className={`checkout-page__input ${errors?.entrance ? "checkout-page__input--error" : ""}`}
              placeholder="1"
              {...register("entrance", {required: "Укажите подъезд"})}
            />
            {errors?.entrance && (
              <span className="checkout-page__error">{errors.entrance.message}</span>
            )}
          </div>
          <div className="checkout-page__field">
            <label className="checkout-page__label top">Этаж</label>
            <input
              className="checkout-page__input"
              placeholder="1"
              {...register("floor")}
            />
          </div>
          <div className="checkout-page__field">
            <label className="checkout-page__label">
              Квартира <span className="checkout-delivery__optional top">(опционально)</span>
            </label>
            <input
              className="checkout-page__input"
              placeholder="1"
              {...register("apartment")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutDeliveryAddress;