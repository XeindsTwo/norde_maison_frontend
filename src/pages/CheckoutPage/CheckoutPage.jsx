import {useState} from "react";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import {useOrderPreview} from "@/hooks/useOrderPreview";
import {useCreateOrder} from "@/hooks/useCreateOrder";
import {useCurrency} from "@/context/CurrencyContext";
import {getSubtotal, convertPrice} from "@/utils/formatPrice";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import CheckoutDelivery from "./components/CheckoutDelivery/CheckoutDelivery";
import CheckoutSummary from "./components/CheckoutSummary/CheckoutSummary";
import CheckoutSuccessModal from "./components/CheckoutSuccessModal";
import Skeleton from "react-loading-skeleton";
import "./CheckoutPage.scss";

const COUNTRY_CURRENCY = {RU: "rub", KZ: "kzt", BY: "byn"};

const CheckoutPage = () => {
  const {data: preview, isLoading} = useOrderPreview();
  const {currency} = useCurrency();

  const [delivery, setDelivery] = useState({country: "RU", method: "cdek_pvz"});
  const [successOrder, setSuccessOrder] = useState(null);

  const {mutate: submitOrder, isPending} = useCreateOrder({
    onSuccess: (data) => setSuccessOrder(data.order_number)
  });

  const regions = preview?.delivery_regions || [];
  const currentRegion = regions.find(r => r.code === delivery.country);
  const subtotal = getSubtotal(preview, currency);
  const deliveryCurrency = COUNTRY_CURRENCY[delivery.country] || "rub";

  const calcDeliveryPrice = (region, method) => {
    if (!region || method === "pickup") return 0;

    const prices = {
      rub: {
        pvz: Number(region.cdek_pvz_price),
        pvz_free: Number(region.cdek_pvz_free_from),
        courier: Number(region.cdek_courier_price),
        courier_free: Number(region.cdek_courier_free_from),
      },
      kzt: {
        pvz: Number(region.cdek_pvz_price_kzt),
        pvz_free: Number(region.cdek_pvz_free_from_kzt),
        courier: Number(region.cdek_courier_price_kzt),
        courier_free: Number(region.cdek_courier_free_from_kzt),
      },
      byn: {
        pvz: Number(region.cdek_pvz_price_byn),
        pvz_free: Number(region.cdek_pvz_free_from_byn),
        courier: Number(region.cdek_courier_price_byn),
        courier_free: Number(region.cdek_courier_free_from_byn),
      },
    };

    const p = prices[deliveryCurrency];
    const subtotalInDeliveryCurrency = convertPrice(subtotal, currency, deliveryCurrency);

    if (method === "cdek_pvz") return subtotalInDeliveryCurrency >= p.pvz_free ? 0 : p.pvz;
    if (method === "cdek_courier") return subtotalInDeliveryCurrency >= p.courier_free ? 0 : p.courier;
    return 0;
  };

  const deliveryPrice = calcDeliveryPrice(currentRegion, delivery.method);
  const deliveryPriceConverted = convertPrice(deliveryPrice, deliveryCurrency, currency);
  const total = subtotal + deliveryPriceConverted;

  const handleSubmit = (formData) => {
    submitOrder({
      ...formData,
      country: delivery.country,
      delivery_method: delivery.method,
      delivery_price: deliveryPrice,
    });
  };

  return (
    <>
      <Header/>
      <main className="checkout-page">
        <div className="container container--padding">
          {isLoading ? (
            <CheckoutSkeleton/>
          ) : !preview?.items?.length ? (
            <div className="checkout-page__empty">
              <p>Корзина пуста, вы ещё не добавили товары</p>
            </div>
          ) : (
            <div className="checkout-page__layout">
              <div className="checkout-page__left">
                <h1 className="checkout-page__title">Оформление заказа</h1>
                <CheckoutForm
                  onSubmit={handleSubmit}
                  isPending={isPending}
                  deliverySlot={
                    <CheckoutDelivery
                      regions={regions}
                      delivery={delivery}
                      subtotal={subtotal}
                      currency={currency}
                      deliveryCurrency={deliveryCurrency}
                      onChange={setDelivery}
                    />
                  }
                />
              </div>
              <div className="checkout-page__right">
                <CheckoutSummary
                  items={preview?.items || []}
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
          )}
        </div>
      </main>
      <Footer/>

      <CheckoutSuccessModal
        isOpen={!!successOrder}
        orderNumber={successOrder}
        onClose={() => setSuccessOrder(null)}
      />
    </>
  );
};

const CheckoutSkeleton = () => (
  <div className="checkout-page__layout">
    <div className="checkout-page__left">
      <Skeleton height={420} borderRadius={12}/>
      <Skeleton height={320} borderRadius={12}/>
    </div>
    <div className="checkout-page__right">
      <Skeleton height={380} borderRadius={12}/>
    </div>
  </div>
);

export default CheckoutPage;