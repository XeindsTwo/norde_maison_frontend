import {useState} from "react";
import "./CartPage.scss";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";

import {showNotification} from "@/components/Notification/Notification";
import {useCart} from "@/hooks/useCart";
import {useCurrency} from "@/context/CurrencyContext";

import CartTable from "./components/CartTable/CartTable";
import CartSummary from "./components/CartSummary/CartSummary";
import CartDeleteConfirmModal from "./components/CartDeleteConfirmModal";
import CartTableSkeleton from "./components/CartTableSkeleton";

const CartPage = () => {

  const {
    data: cart,
    updateItem,
    deleteItem,
    isLoading,
    refetchCart
  } = useCart();

  const {currency} = useCurrency();

  const [deleteTarget, setDeleteTarget] = useState(null);

  const items = cart?.items || [];
  const isCartEmpty = !isLoading && items.length === 0;

  const handleQuantityChange = (itemId, quantity) => {

    updateItem(
      {
        id: itemId,
        data: {quantity}
      },
      {
        onSuccess: () => {
          refetchCart();

          showNotification({
            title: "Корзина",
            message: "Количество товара изменено"
          });
        }
      }
    );
  };

  const handleDeleteConfirm = () => {

    if (!deleteTarget) return;

    deleteItem(deleteTarget, {
      onSuccess: () => {
        refetchCart();

        showNotification({
          title: "Удалено",
          message: "Товар удалён из корзины"
        });

        setDeleteTarget(null);
      }
    });
  };

  return (
    <>
      <Header/>

      <main className="cart-page">
        <div className="container container--padding">

          <h1 className="cart-page__title">
            Корзина
          </h1>

          {isLoading ? (
            <CartTableSkeleton/>
          ) : isCartEmpty ? (
            <p className="cart-page__empty">
              Товаров в корзине ещё нет ¯\_(ツ)_/¯
            </p>
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