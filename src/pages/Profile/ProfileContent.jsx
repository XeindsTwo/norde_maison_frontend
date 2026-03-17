import ProfileFavorites from "./components/tabs/ProfileFavorites.jsx";
import ProfileInfo from "./components/tabs/ProfileInfo/ProfileInfo.jsx";
import ProfileOrdersTab from "./components/tabs/ProfileOrdersTab/ProfileOrdersTab.jsx";
import ProfileLogoutConfirm from "./components/tabs/ProfileLogoutConfirm/ProfileLogoutConfirm.jsx";
import { AnimatePresence, motion } from "framer-motion";

const ProfileContent = ({ tab, setTab, orders, isLoading, onOrderClick }) => {

  const renderTab = () => {
    switch (tab) {
      case "info":
        return <ProfileInfo />;
      case "favorites":
        return <ProfileFavorites />;
      case "logout":
        return <ProfileLogoutConfirm onCancel={() => setTab("favorites")} />;
      case "orders":
      default:
        return (
          <ProfileOrdersTab
            orders={orders}
            isLoading={isLoading}
            onOrderClick={onOrderClick}
          />
        );
    }
  };

  return (
    <div className="profile-content">
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.2 }}
        >
          {renderTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfileContent;