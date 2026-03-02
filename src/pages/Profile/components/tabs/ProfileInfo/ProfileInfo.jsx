import {useAuth} from "@/context/AuthContext";
import {useState, useMemo, useEffect} from "react";
import {updateProfile} from "@/api/auth";
import {showNotification} from "@/components/Notification/Notification";

const ProfileInfo = () => {

  const {user} = useAuth();

  const initialState = useMemo(() => ({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.profile?.phone || "",
    tg_username: user?.profile?.tg_username || "",
    address: user?.profile?.address || ""
  }), [user]);

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initialState);
  }, [initialState]);

  const hasChanges =
    JSON.stringify(form) !== JSON.stringify(initialState);

  const handleSave = async () => {

    if (!hasChanges) return;

    try {
      setLoading(true);

      await updateProfile(form);

      showNotification({
        title: "Профиль обновлен",
        message: "Информация успешно обновлена",
        type: "success"
      });

    } catch {
      showNotification({
        title: "Ошибка",
        message: "Не удалось обновить профиль",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-form">

      <h2>Личная информация</h2>

      <input value={user.email} disabled />

      <input
        placeholder="Имя"
        value={form.first_name}
        onChange={e =>
          setForm({...form, first_name: e.target.value})
        }
      />

      <input
        placeholder="Фамилия"
        value={form.last_name}
        onChange={e =>
          setForm({...form, last_name: e.target.value})
        }
      />

      <input
        placeholder="Телефон"
        value={form.phone}
        onChange={e =>
          setForm({...form, phone: e.target.value})
        }
      />

      <input
        placeholder="Telegram"
        value={form.tg_username}
        onChange={e =>
          setForm({...form, tg_username: e.target.value})
        }
      />

      <textarea
        placeholder="Адрес"
        value={form.address}
        onChange={e =>
          setForm({...form, address: e.target.value})
        }
      />

      <div style={{marginTop: "24px"}}>
        <button
          disabled={!hasChanges || loading}
          onClick={handleSave}
        >
          {loading ? "Сохранение..." : "Сохранить изменения"}
        </button>
      </div>

    </div>
  );
};

export default ProfileInfo;