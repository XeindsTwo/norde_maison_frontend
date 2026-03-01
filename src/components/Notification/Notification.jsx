import toast, {Toaster} from "react-hot-toast";
import "./Notification.scss";
import CrossIcon from "@/assets/images/icons/cross-modal.svg";
import {motion, AnimatePresence} from "framer-motion";

export const showNotification = (data) => {
  toast.custom((t) => {
    return (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{x: 200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: 200, opacity: 0}}
            transition={{duration: 0.25, ease: "easeOut"}}
            className={`notification notification--${data.type || "success"}`}
          >
            <div className="notification__left">
              {data.title && (
                <div className="notification__title">
                  {data.title}
                </div>
              )}

              {data.message && (
                <div className="notification__message">
                  {data.message}
                </div>
              )}
            </div>

            <button
              className="notification__close"
              onClick={() => toast.dismiss(t.id)}
            >
              <CrossIcon/>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }, {
    duration: 3000,
    position: "top-right"
  });
};

export const Notification = () => {
  return (
    <Toaster
      position="top-right"
      containerStyle={{
        top: 110,
        right: 40
      }}
      toastOptions={{
        style: {
          background: "transparent",
          boxShadow: "none"
        }
      }}
    />
  );
};