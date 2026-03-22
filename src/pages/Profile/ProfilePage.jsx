import "./Profile.scss";
import {useLocation, useSearchParams,} from "react-router-dom";
import {useState, useEffect, useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";
import ProfileContent from "./ProfileContent";
import CheckoutSuccessModal from "@/components/Modals/CheckoutSuccessModal";
import OrderDetailsModal from "./components/tabs/ProfileOrdersTab/OrderDetailsModal/OrderDetailsModal";
import {getUserOrders, getPendingOrder} from "@/api/auth";

const ProfilePage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [tab, setTab] = useState("orders");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(null);

  const {data: ordersData, isLoading} = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => (await getUserOrders()).data,
    staleTime: 5 * 60 * 1000
  });

  const orders = Array.isArray(ordersData) ? ordersData : [];

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const {data} = await getPendingOrder();
        if (data.has_pending) setPendingOrder(data);
        else setPendingOrder(undefined);
      } catch (e) {
        console.error(e);
        setPendingOrder(undefined);
      }
    };
    fetchPending();
  }, []);

  useEffect(() => {
    const orderFromState = location.state?.orderNumber;
    const orderFromSearch = searchParams.get("order_number");

    const orderNumber = orderFromState || orderFromSearch;
    const isFromCheckout =
      location.state?.orderSuccess ||
      (searchParams.has("order_success") && searchParams.get("order_success") === "true");

    if (!isFromCheckout || !orderNumber || !orders.length) return;

    const order = orders.find(o => o.order_number === orderNumber);
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
      <Header/>
      <div className="container container--padding">
        <div className="profile__layout">
          <ProfileSidebar activeTab={tab} onChangeTab={setTab}/>
          <ProfileContent
            tab={tab}
            setTab={setTab}
            orders={orders}
            isLoading={isLoading}
            onOrderClick={openOrderDetails}
            pendingOrder={pendingOrder}
          />
        </div>
      </div>
      <Footer/>
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
          onClose={closeOrderModal}
        />
      )}
    </>
  );
};

export default ProfilePage;