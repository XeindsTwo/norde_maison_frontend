import "./Profile.scss";
import {useState, useEffect, useCallback} from "react";
import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";
import ProfileContent from "./ProfileContent";
import CheckoutSuccessModal from "@/components/Modals/CheckoutSuccessModal";
import OrderDetailsModal from "./components/tabs/ProfileOrdersTab/OrderDetailsModal/OrderDetailsModal";
import {getUserOrders} from "@/api/auth";

const ProfilePage = () => {
  const location = useLocation();

  const [tab, setTab] = useState("orders");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {data: ordersData, isLoading} = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => (await getUserOrders()).data,
    staleTime: 5 * 60 * 1000
  });

  const orders = Array.isArray(ordersData) ? ordersData : [];

  // 🔥 ГЛАВНАЯ ЛОГИКА
  useEffect(() => {
    if (!location.state?.orderSuccess || !orders.length) return;

    const orderNumber = location.state.orderNumber;

    const order = orders.find(o => o.order_number === orderNumber);

    if (order) {
      setSelectedOrder(order);
      setShowSuccessModal(true);

      window.history.replaceState({}, "", "/profile");
    }
  }, [location.state, orders]);

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