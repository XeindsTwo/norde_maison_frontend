import "./ProfilePasswordChange.scss";
import {useState, useRef, useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {changePassword} from "@/api/auth";
import {showNotification} from "@/components/Notification/Notification";

import ShowIcon from "@/assets/images/icons/show.svg";
import HideIcon from "@/assets/images/icons/hide.svg";

const ProfilePasswordChange = () => {

  const {logout} = useAuth();

  const timerRef = useRef(null);

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false
  });

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const toggleVisibility = (field) => {

    setVisible(prev => {

      const next = {
        ...prev,
        [field]: !prev[field]
      };

      clearTimeout(timerRef.current);

      if (!prev[field]) {
        timerRef.current = setTimeout(() => {
          setVisible(v => ({
            ...v,
            [field]: false
          }));
        }, 2000);
      }

      return next;
    });
  };

  const handleChangePassword = async () => {

    if (loading) return;

    const { old_password, new_password, confirm_password } = form;

    if (!old_password || !new_password || !confirm_password) return;

    if (new_password !== confirm_password) {
      return showNotification({
        title: "Ошибка",
        message: "Пароли не совпадают",
        type: "error"
      });
    }

    if (new_password.length < 8) {
      return showNotification({
        title: "Ошибка",
        message: "Минимум 8 символов",
        type: "error"
      });
    }

    try {

      setLoading(true);

      const res = await changePassword({
        old_password,
        new_password
      });

      const newToken = res?.data?.token;

      if (newToken) {
        localStorage.setItem("token", newToken);
      }

      showNotification({
        title: "Пароль изменён",
        message: "Пароль успешно обновлён",
        type: "success"
      });

      setForm({
        old_password: "",
        new_password: "",
        confirm_password: ""
      });

    } catch (error) {

      const message =
        error?.response?.data?.new_password?.[0] ||
        error?.response?.data?.detail ||
        "Не удалось изменить пароль";

      showNotification({
        title: "Ошибка",
        message,
        type: "error"
      });

    } finally {
      setLoading(false);
    }
  };

  const renderInput = (placeholder, field) => (
    <div className="profile-password__wrapper">

      <input
        className="profile-form__input"
        type={visible[field] ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="new-password"
        value={form[field]}
        onChange={e => {

          setForm(prev => ({
            ...prev,
            [field]: e.target.value
          }));

          setVisible(prev => ({
            ...prev,
            [field]: false
          }));
        }}
      />

      <button
        type="button"
        className="profile-password__eye"
        onClick={() => toggleVisibility(field)}
      >
        {visible[field] ? <HideIcon/> : <ShowIcon/>}
      </button>

    </div>
  );

  return (
    <div className="profile-password">

      <h3 className="profile__tab-title small">
        Изменение пароля
      </h3>

      <div className="profile-form__fields">
        {renderInput("Текущий пароль", "old_password")}
        {renderInput("Новый пароль", "new_password")}
        {renderInput("Повторите новый пароль", "confirm_password")}
      </div>

      <button
        className="profile-form__button btn"
        disabled={loading}
        onClick={handleChangePassword}
      >
        {loading ? "Смена пароля..." : "Сменить пароль"}
      </button>

    </div>
  );
};

export default ProfilePasswordChange;