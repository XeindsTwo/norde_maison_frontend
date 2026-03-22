import {useState, useEffect} from "react";
import "./CartPage.scss";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import PendingOrder from "@/components/PendingOrder/PendingOrder.jsx";
import {showNotification} from "@/components/Notification/Notification";
import {useCart} from "@/hooks/useCart";
import {useCurrency} from "@/context/CurrencyContext";
import {useAuth} from "@/context/AuthContext";
import {api} from "@/api/http";
import CartTable from "./components/CartTable/CartTable";
import CartSummary from "./components/CartSummary/CartSummary";
import CartDeleteConfirmModal from "./components/CartDeleteConfirmModal";
import CartTableSkeleton from "./components/CartTableSkeleton";

const CartPage = () => {
  const {data: cart, updateItem, deleteItem, isLoading, refetchCart} = useCart();
  const {currency} = useCurrency();
  const {user} = useAuth();

  const [pendingOrder, setPendingOrder] = useState(null);
  const [pendingOrderLoading, setPendingOrderLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const items = cart?.items || [];
  const isCartEmpty = !isLoading && items.length === 0;
  const hasUnavailable = items.some(item => !item.is_available);

  useEffect(() => {
    if (!user) return;

    const fetchPending = async () => {
      setPendingOrderLoading(true);
      try {
        const {data} = await api.get("/orders/checkout/current-pending/");
        if (data.has_pending) setPendingOrder(data);
        else setPendingOrder(null);
      } catch (e) {
        console.error("Error fetching pending order:", e);
        setPendingOrder(null);
      } finally {
        setPendingOrderLoading(false);
      }
    };

    fetchPending();
  }, [user]);

  const handleQuantityChange = (itemId, quantity) => {
    updateItem(
      {id: itemId, data: {quantity}},
      {
        onSuccess: () => {
          refetchCart();
          showNotification({title: "Корзина", message: "Количество товара изменено"});
        }
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteItem(deleteTarget, {
      onSuccess: () => {
        refetchCart();
        showNotification({title: "Удалено", message: "Товар удалён из корзины"});
        setDeleteTarget(null);
      }
    });
  };

  return (
    <>
      <Header/>

      <main className="cart-page">
        <div className="container container--padding">
          <h1 className="cart-page__title">Корзина</h1>

          {!pendingOrderLoading && pendingOrder && (
            <PendingOrder
              order={pendingOrder}
              currency={currency}
              onPayClick={() => (window.location.href = pendingOrder.payment_url)}
            />
          )}

          {pendingOrder && !pendingOrderLoading ? null : isLoading ? (
            <CartTableSkeleton/>
          ) : isCartEmpty ? (
            <p className="cart-page__empty">Товаров в корзине ещё нет ¯\_(ツ)_/¯</p>
          ) : (
            <>
              <CartTable
                cart={cart}
                currency={currency}
                onDelete={setDeleteTarget}
                onQuantityChange={handleQuantityChange}
              />
              <CartSummary
                cart={cart}
                currency={currency}
                hasUnavailable={hasUnavailable}
              />
            </>
          )}
        </div>
      </main>

      <Footer/>

      <CartDeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default CartPage;