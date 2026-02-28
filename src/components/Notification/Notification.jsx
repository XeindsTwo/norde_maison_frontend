import {AnimatePresence, motion} from "framer-motion";
import {useNotification} from "./NotificationContext";
import "./Notification.scss";
import CrossIcon from "@/assets/images/icons/cross-modal.svg";

const variants = {
  hidden: {x: 400, opacity: 0},
  visible: {x: 0, opacity: 1},
  exit: {x: 400, opacity: 0}
};

export const Notification = () => {
  const {notification, hideNotification} = useNotification();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          className={`notification notification--${notification.type}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{duration: 0.25}}
        >
          <div className="notification__left">
            {notification.title && (
              <div className="notification__title">
                {notification.title}
              </div>
            )}
            {notification.message && (
              <div className="notification__message">
                {notification.message}
              </div>
            )}
          </div>
          <button
            className="notification__close"
            onClick={hideNotification}
          >
            <CrossIcon/>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};