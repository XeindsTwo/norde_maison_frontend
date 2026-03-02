import "./ProfileInfo.scss";
import {useAuth} from "@/context/AuthContext";
import {useState, useEffect, useMemo} from "react";
import {updateProfile} from "@/api/auth";
import {showNotification} from "@/components/Notification/Notification";
import AddressField from "@/components/AddressField/AddressField.jsx";

const normalize = (str = "") =>
  str.trim().toLowerCase().replace(/\s+/g, " ");

const ProfileInfo = () => {
  const {user} = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    tg_username: "",
    address: ""
  });

  const [initialForm, setInitialForm] = useState(form);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const next = {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      phone: user.profile?.phone || "",
      tg_username: user.profile?.tg_username || "",
      address: user.profile?.address || ""
    };

    setForm(next);
    setInitialForm(next);
  }, [user]);

  const hasChanges = useMemo(() => {
    return (
      normalize(form.first_name) !== normalize(initialForm.first_name || "") ||
      normalize(form.last_name) !== normalize(initialForm.last_name || "") ||
      normalize(form.phone) !== normalize(initialForm.phone || "") ||
      normalize(form.tg_username) !== normalize(initialForm.tg_username || "") ||
      normalize(form.address) !== normalize(initialForm.address || "")
    );
  }, [form, initialForm]);

  const handleSave = async () => {
    if (!hasChanges || loading) return;

    try {
      setLoading(true);
      await updateProfile(form);

      setInitialForm(form);

      showNotification({
        title: "Профиль обновлен",
        message: "Информация успешно сохранена",
        type: "success"
      });
    } catch {
      showNotification({
        title: "Ошибка",
        message: "Не удалось сохранить профиль",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-form">
      <h2 className="profile__tab-title">Личная информация</h2>
      <div className="profile-form__fields">
        <input
          className="profile-form__input profile-form__input--email"
          value={user.email}
          disabled
          placeholder="Email"
        />
        <input
          className="profile-form__input profile-form__input--first-name"
          placeholder="Имя"
          maxLength="100"
          value={form.first_name}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              first_name: e.target.value
            }))
          }
        />
        <input
          className="profile-form__input profile-form__input--last-name"
          placeholder="Фамилия"
          maxLength="100"
          value={form.last_name}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              last_name: e.target.value
            }))
          }
        />
        <input
          className="profile-form__input profile-form__input--phone"
          placeholder="Телефон"
          value={form.phone}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              phone: e.target.value
            }))
          }
        />
        <input
          className="profile-form__input profile-form__input--telegram"
          placeholder="Telegram"
          value={form.tg_username}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              tg_username: e.target.value
            }))
          }
        />
        <AddressField
          value={form.address}
          onChange={address =>
            setForm(prev => ({...prev, address}))
          }
        />
      </div>
      <button
        className="profile-form__button btn"
        disabled={!hasChanges || loading}
        onClick={handleSave}
      >
        {loading ? "Сохранение..." : "Сохранить изменения"}
      </button>
    </div>
  );
};

export default ProfileInfo;