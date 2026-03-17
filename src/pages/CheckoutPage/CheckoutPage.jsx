import {useState, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import {useOrderPreview} from "@/hooks/useOrderPreview";
import {useCreateOrder} from "@/hooks/useCreateOrder";
import {useCurrency} from "@/context/CurrencyContext";
import {useAuth} from "@/context/AuthContext";
import {getSubtotal, convertPrice} from "@/utils/formatPrice";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import CheckoutDeliveryCountry from "./components/CheckoutDelivery/CheckoutDeliveryCountry";
import CheckoutDeliveryMethods from "./components/CheckoutDelivery/CheckoutDeliveryMethods";
import CheckoutDeliveryAddress from "./components/CheckoutDelivery/CheckoutDeliveryAddress";
import CheckoutSummary from "./components/CheckoutSummary/CheckoutSummary";
import Skeleton from "react-loading-skeleton";
import "./CheckoutPage.scss";

const COUNTRY_CURRENCY = {RU: "rub", KZ: "kzt", BY: "byn"};

const CheckoutPage = () => {
  const {data: preview, isLoading} = useOrderPreview();
  const {currency} = useCurrency();
  const {user} = useAuth();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState({
    country: "RU",
    method: "cdek_pvz"
  });

  const {mutate: submitOrder, isPending} = useCreateOrder({
    onSuccess: (order) => {
      navigate("/profile", {
        state: { orderSuccess: true, orderData: order }
      });
    }
  });

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

  const regions = preview?.delivery_regions || [];
  const currentRegion = regions.find(r => r.code === delivery.country);
  const subtotal = getSubtotal(preview, currency);
  const deliveryCurrency = COUNTRY_CURRENCY[delivery.country] || "rub";

  const deliveryPrice = useMemo(() => {
    if (!currentRegion || delivery.method === "pickup") return 0;
    const prices = {
      rub: {
        pvz: Number(currentRegion.cdek_pvz_price),
        pvz_free: Number(currentRegion.cdek_pvz_free_from),
        courier: Number(currentRegion.cdek_courier_price),
        courier_free: Number(currentRegion.cdek_courier_free_from)
      },
      kzt: {
        pvz: Number(currentRegion.cdek_pvz_price_kzt),
        pvz_free: Number(currentRegion.cdek_pvz_free_from_kzt),
        courier: Number(currentRegion.cdek_courier_price_kzt),
        courier_free: Number(currentRegion.cdek_courier_free_from_kzt)
      },
      byn: {
        pvz: Number(currentRegion.cdek_pvz_price_byn),
        pvz_free: Number(currentRegion.cdek_pvz_free_from_byn),
        courier: Number(currentRegion.cdek_courier_price_byn),
        courier_free: Number(currentRegion.cdek_courier_free_from_byn)
      }
    };
    const p = prices[deliveryCurrency];
    const subtotalInDeliveryCurrency = convertPrice(subtotal, currency, deliveryCurrency);

    if (delivery.method === "cdek_pvz") return subtotalInDeliveryCurrency >= p.pvz_free ? 0 : p.pvz;
    if (delivery.method === "cdek_courier") return subtotalInDeliveryCurrency >= p.courier_free ? 0 : p.courier;
    return 0;
  }, [currentRegion, delivery.method, deliveryCurrency, subtotal, currency]);

  const deliveryPriceConverted = convertPrice(deliveryPrice, deliveryCurrency, currency);
  const total = subtotal + deliveryPriceConverted;

  const handleSubmit = ({entrance, floor, apartment, ...formData}) => {
    submitOrder({
      ...formData,
      country: delivery.country,
      delivery_method: delivery.method,
      delivery_price: deliveryPrice,
      delivery_extra: {entrance: entrance || "", floor: floor || "", apartment: apartment || ""}
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
        <textarea className="checkout-page__input checkout-page__textarea" rows={4} {...register("comment")}/>
      </div>
      <label className="checkout-delivery__checkbox">
        <input type="checkbox" {...register("save_address")}/>
        <span>Сохранить адрес доставки</span>
      </label>
    </>
  );

  if (isLoading) return (
    <>
      <Header/>
      <main className="checkout-page">
        <div className="container container--padding">
          <Skeleton height={500}/>
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
              <CheckoutForm
                onSubmit={handleSubmit}
                isPending={isPending}
                defaultValues={profileDefaults}
                deliverySlot={deliverySlot}
              />
            </div>
            <div className="checkout-page__right">
              <CheckoutSummary
                items={preview.items}
                subtotal={subtotal}
                deliveryPrice={deliveryPrice}
                deliveryPriceConverted={deliveryPriceConverted}
                currentRegion={currentRegion}
                deliveryMethod={delivery.method}
                currency={currency}
                deliveryCurrency={deliveryCurrency}
                total={total}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default CheckoutPage;