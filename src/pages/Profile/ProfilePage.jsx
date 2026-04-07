import "./Profile.scss";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";
import ProfileSidebarMobile from "./components/ProfileSidebar/ProfileSidebarMobile";
import ProfileContent from "./ProfileContent";
import CheckoutSuccessModal from "@/components/Modals/CheckoutSuccessModal";
import OrderDetailsModal from "./components/tabs/ProfileOrdersTab/OrderDetailsModal/OrderDetailsModal";
import { getUserOrders, getPendingOrder, getMe } from "@/api/auth";

const ProfilePage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currency = searchParams.get("currency") || "rub";

  const [tab, setTab] = useState("orders");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(null);

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["userOrders", currency],
    queryFn: async () => (await getUserOrders({ currency })).data,
    staleTime: 5 * 60 * 1000,
  });

  const orders = Array.isArray(ordersData) ? ordersData : [];

  const { data: meData, isLoading: isLoadingMe } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const supportUrl = meData?.data?.support_url || null;

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const { data } = await getPendingOrder();
        if (data?.has_pending) setPendingOrder(data);
        else setPendingOrder(null);
      } catch {
        setPendingOrder(null);
      }
    };
    fetchPending();
  }, []);

  useEffect(() => {
    if (!orders.length) return;

    const orderFromState = location.state?.orderNumber;
    const orderFromSearch = searchParams.get("order_number");
    const orderNumber = orderFromState || orderFromSearch;

    const isFromCheckout =
      location.state?.orderSuccess ||
      searchParams.get("order_success") === "true";

    if (!isFromCheckout || !orderNumber) return;

    const order = orders.find((o) => o.order_number === orderNumber);
    if (order) {
      setSelectedOrder(order);
      setShowSuccessModal(true);

      const url = new URL(window.location.href);
      url.searchParams.delete("order_success");
      url.searchParams.delete("order_number");
      window.history.replaceState({}, "", url.toString());
    }
  }, [location.state, searchParams, orders]);

  const closeSuccessModal = () => setShowSuccessModal(false);

  const closeOrderModal = () => {
    setShowOrderDetails(false);
    setTimeout(() => setSelectedOrder(null), 200);
  };

  const openOrderDetails = useCallback((orderData) => {
    setSelectedOrder(orderData);
    setShowSuccessModal(false);
    setShowOrderDetails(true);
  }, []);

  return (
    <>
      <Header />
      <div className="container container--padding">
        <div className="profile__layout">
          <div className="desktop-only">
            <ProfileSidebar
              activeTab={tab}
              onChangeTab={setTab}
              supportUrl={supportUrl}
              isLoading={isLoadingMe}
            />
          </div>

          <div className="mobile-only">
            <ProfileSidebarMobile
              activeTab={tab}
              onChangeTab={setTab}
              supportUrl={supportUrl}
            />
          </div>

          <ProfileContent
            tab={tab}
            setTab={setTab}
            orders={orders}
            isLoading={isLoadingOrders || isLoadingMe}
            onOrderClick={openOrderDetails}
            pendingOrder={pendingOrder}
            currency={currency}
          />
        </div>
      </div>
      <Footer />

      {showSuccessModal && (
        <CheckoutSuccessModal
          isOpen={showSuccessModal}
          order={selectedOrder}
          onClose={closeSuccessModal}
          onViewOrder={openOrderDetails}
        />
      )}

      {selectedOrder && showOrderDetails && (
        <OrderDetailsModal
          isOpen={showOrderDetails}
          order={selectedOrder}
          currency={currency}
          onClose={closeOrderModal}
        />
      )}
    </>
  );
};

export default ProfilePage;