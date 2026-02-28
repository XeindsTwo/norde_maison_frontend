import {useState, useRef} from "react";
import {NotificationContext} from "./NotificationContext";
import {Notification} from "./Notification";

export const NotificationProvider = ({children}) => {
  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  const showNotification = (notificationData) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setNotification({
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type || "success"
    });

    timerRef.current = setTimeout(() => {
      hideNotification();
    }, 3500);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{
      notification,
      showNotification,
      hideNotification
    }}>
      {children}

      <Notification/>
    </NotificationContext.Provider>
  );
};