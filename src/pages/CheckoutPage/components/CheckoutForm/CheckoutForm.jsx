import {useForm} from "react-hook-form";
import IomoneyIcon from "@/assets/images/icons/iomoney.svg";
import "./CheckoutForm.scss";

const CheckoutForm = ({onSubmit, isPending, deliverySlot, defaultValues, orderCreated, paymentUrl, orderNumber}) => {
  const methods = useForm({defaultValues});
  const {register, handleSubmit, formState: {errors}, watch, setValue} = methods;

  const handlePayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="checkout-form__section">
        <h2 className="checkout-form__section-title">Личные данные</h2>

        <div className="checkout-form__row">
          <div className="checkout-page__field">
            <label className="checkout-page__label">Имя</label>
            <input
              className={`checkout-page__input ${errors.first_name ? "checkout-page__input--error" : ""}`}
              placeholder="Влад"
              {...register("first_name", {required: "Введите имя"})}
            />
            {errors.first_name && (
              <span className="checkout-page__error">{errors.first_name.message}</span>
            )}
          </div>

          <div className="checkout-page__field">
            <label className="checkout-page__label">Фамилия</label>
            <input
              className={`checkout-page__input ${errors.last_name ? "checkout-page__input--error" : ""}`}
              placeholder="Иванов"
              {...register("last_name", {required: "Введите фамилию"})}
            />
            {errors.last_name && (
              <span className="checkout-page__error">{errors.last_name.message}</span>
            )}
          </div>
        </div>

        <div className="checkout-page__field">
          <label className="checkout-page__label">Отчество</label>
          <input
            className="checkout-page__input"
            placeholder="Ивановна"
            {...register("middle_name")}
          />
        </div>

        <div className="checkout-page__field">
          <label className="checkout-page__label">Номер телефона</label>
          <input
            className={`checkout-page__input ${errors.phone ? "checkout-page__input--error" : ""}`}
            placeholder="+7 901 234 56-78"
            {...register("phone", {required: "Введите телефон"})}
          />
          {errors.phone && (
            <span className="checkout-page__error">{errors.phone.message}</span>
          )}
        </div>

        <div className="checkout-page__field">
          <label className="checkout-page__label">Telegram (опционально)</label>
          <input
            className="checkout-page__input"
            placeholder="@example"
            {...register("telegram")}
          />
        </div>
      </div>

      <div className="checkout-form__section">
        <h2 className="checkout-form__section-title">Доставка</h2>
        {deliverySlot({register, errors, watch, setValue})}
      </div>

      {!orderCreated ? (
        <button
          type="submit"
          className="checkout-form__submit"
          disabled={isPending}
        >
          {isPending ? <>Оформляем</> : <><IomoneyIcon/>Перейти к оплате</>}
        </button>
      ) : (
        <button
          type="button"
          className="checkout-form__submit"
          onClick={handlePayment}
          disabled={isPending}
        >
          <IomoneyIcon/>Оплатить заказ #{orderNumber}
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;