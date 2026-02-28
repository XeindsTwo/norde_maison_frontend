import toast, {Toaster} from "react-hot-toast";
import "./Notification.scss";
import CrossIcon from "@/assets/images/icons/cross-modal.svg";

export const showNotification = (data) => {
  toast.custom((t) => {
    const visible = t.visible;

    return (
      <div
        className={`notification notification--${data.type || "success"}`}
        style={{
          transform: visible ? "translateX(0)" : "translateX(150%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.25s ease, opacity 0.25s ease"
        }}
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
      </div>
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
        top: 70,
        right: 40
      }}
    />
  );
};