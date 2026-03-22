import {useState, useMemo, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import {useOrderPreview} from "@/hooks/useOrderPreview";
import {useCreateOrder} from "@/hooks/useCreateOrder";
import {useCurrency} from "@/context/CurrencyContext";
import {useAuth} from "@/context/AuthContext";
import {getSubtotal, convertPrice} from "@/utils/formatPrice";
import {api} from "@/api/http";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import CheckoutDeliveryCountry from "./components/CheckoutDelivery/CheckoutDeliveryCountry";
import CheckoutDeliveryMethods from "./components/CheckoutDelivery/CheckoutDeliveryMethods";
import CheckoutDeliveryAddress from "./components/CheckoutDelivery/CheckoutDeliveryAddress";
import CheckoutSummary from "./components/CheckoutSummary/CheckoutSummary";
import Skeleton from "react-loading-skeleton";
import PendingOrder from "@/components/PendingOrder/PendingOrder.jsx";
import "./CheckoutPage.scss";

const COUNTRY_CURRENCY = {RU: "rub", KZ: "kzt", BY: "byn"};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {data: preview = {}, isLoading, error} = useOrderPreview();
  const {currency} = useCurrency();
  const {user} = useAuth();
  const [delivery, setDelivery] = useState({country: "RU", method: "cdek_pvz"});
  const [paymentUrl] = useState(null);
  const [paymentId] = useState(null);
  const [orderNumber] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(null);

  const {mutate: submitOrder, isPending} = useCreateOrder({
    onSuccess: (data) => {
      window.location.assign(data.payment_url);
    }
  });

  // Получаем pending order
  useEffect(() => {
    if (!user) return;

    const fetchPending = async () => {
      try {
        const {data} = await api.get("/orders/checkout/current-pending/");
        if (data.has_pending) setPendingOrder(data);
        else setPendingOrder(undefined);
      } catch {
        setPendingOrder(undefined);
      }
    };

    fetchPending();

    const interval = setInterval(fetchPending, 5000);

    return () => clearInterval(interval);
  }, [user]);

  // Проверка оплаты
  useEffect(() => {
    if (!paymentId) return;
    const interval = setInterval(async () => {
      try {
        const {data} = await api.get(`orders/payment/${paymentId}/status/`);
        if (data.succeeded) {
          clearInterval(interval);
          navigate("/profile", {state: {orderSuccess: true, orderNumber}});
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [paymentId, orderNumber, navigate]);

  const profileDefaults = useMemo(() => ({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.profile?.phone || "",
    telegram: user?.profile?.tg_username || "",
    address: user?.profile?.address || "",
    middle_name: "",
    comment: "",
    save_address: false
  }), [user]);

  const regions = preview.delivery_regions || [];
  const currentRegion = regions.find(r => r.code === delivery.country);
  const subtotal = getSubtotal(preview, currency);
  const deliveryCurrency = COUNTRY_CURRENCY[delivery.country] || "rub";

  const deliveryPrice = useMemo(() => {
    if (!currentRegion || delivery.method === "pickup") return 0;
    const subtotalRUB = getSubtotal(preview, "rub");

    if (delivery.method === "cdek_pvz") {
      const price = Number(currentRegion.cdek_pvz_price);
      const freeFrom = Number(currentRegion.cdek_pvz_free_from);
      return subtotalRUB >= freeFrom ? 0 : price;
    }
    if (delivery.method === "cdek_courier") {
      const price = Number(currentRegion.cdek_courier_price);
      const freeFrom = Number(currentRegion.cdek_courier_free_from);
      return subtotalRUB >= freeFrom ? 0 : price;
    }
    return 0;
  }, [currentRegion, delivery.method, preview, currency]);

  const deliveryPriceConverted = convertPrice(deliveryPrice, deliveryCurrency, currency);
  const total = subtotal + deliveryPriceConverted;

  const handleSubmit = (data) => {
    submitOrder({
      ...data,
      country: delivery.country,
      delivery_method: delivery.method,
      delivery_price: deliveryPrice,
      currency,
      delivery_extra: {
        entrance: data.entrance || "",
        floor: data.floor || "",
        apartment: data.apartment || ""
      }
    });
  };

  const deliverySlot = ({register, errors, watch, setValue}) => (
    <>
      <CheckoutDeliveryCountry regions={regions} delivery={delivery} onChange={setDelivery}/>
      <CheckoutDeliveryMethods
        regions={regions}
        delivery={delivery}
        subtotal={subtotal}
        currency={currency}
        deliveryCurrency={deliveryCurrency}
        onChange={setDelivery}
      />
      <CheckoutDeliveryAddress
        delivery={delivery}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />
      <div className="checkout-page__field">
        <label className="checkout-page__label">Комментарий</label>
        <textarea className="checkout-page__input checkout-page__textarea" rows={4} {...register("comment")} />
      </div>
      <label className="checkout-delivery__checkbox">
        <input type="checkbox" {...register("save_address")} />
        <span>Сохранить адрес доставки</span>
      </label>
    </>
  );

  const hasItems = (preview.items || []).length > 0;

  if (isLoading) return (
    <>
      <Header/>
      <main className="checkout-page">
        <div className="container container--padding"><Skeleton height={500}/></div>
      </main>
      <Footer/>
    </>
  );

  if (error && !pendingOrder) return (
    <>
      <Header/>
      <main className="checkout-page">
        <div className="container container--padding">
          <p className="checkout-page__empty">Корзина пустая ¯\_(ツ)_/¯</p>
        </div>
      </main>
      <Footer/>
    </>
  );

  return (
    <>
      <Header/>
      <main className="checkout-page">
        <div className="container container--padding">
          <div className="checkout-page__layout">
            <div className="checkout-page__left">
              <h1 className="checkout-page__title">Оформление заказа</h1>

              {!paymentUrl && pendingOrder !== undefined && (
                <PendingOrder
                  order={pendingOrder}
                  currency={currency}
                  isLoading={pendingOrder === null}
                  onPayClick={() => pendingOrder && window.location.assign(pendingOrder.payment_url)}
                />
              )}

              {pendingOrder === undefined && hasItems && (
                <CheckoutForm
                  onSubmit={handleSubmit}
                  isPending={isPending}
                  defaultValues={profileDefaults}
                  deliverySlot={deliverySlot}
                />
              )}

              {pendingOrder === undefined && !hasItems && (
                <p className="checkout-page__empty">Корзина пустая ¯\_(ツ)_/¯</p>
              )}
            </div>

            <div className="checkout-page__right">
              {pendingOrder === undefined && hasItems && (
                <CheckoutSummary
                  items={preview.items || []}
                  subtotal={subtotal}
                  deliveryPrice={deliveryPrice}
                  deliveryPriceConverted={deliveryPriceConverted}
                  currentRegion={currentRegion}
                  deliveryMethod={delivery.method}
                  currency={currency}
                  deliveryCurrency={deliveryCurrency}
                  total={total}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default CheckoutPage;