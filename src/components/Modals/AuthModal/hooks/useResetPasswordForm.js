import {useEffect, useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import * as authApi from "@/api/auth";
import {parseApiError} from "@/utils/apiError";
import {showNotification} from "@/components/Notification/Notification";

export const useResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlToken = searchParams.get("reset_token");
    if (urlToken) {
      setToken(urlToken);
      setOpen(true);
    } else {
      setToken("");
      setOpen(false);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const closeModal = () => {
    setOpen(false);
    setToken("");
    setForm({password: "", password2: ""});
    setError("");
    navigate({pathname: "/", search: ""}, {replace: true});
  };

  const submit = async () => {
    if (loading) return false;

    setError("");
    setLoading(true);

    try {
      if (!token) throw new Error("Неверная или устаревшая ссылка");
      if (!form.password || !form.password2) throw new Error("Заполните оба поля");
      if (form.password.length < 8) throw new Error("В пароле должно быть минимум 8 символов");
      if (form.password !== form.password2) throw new Error("Пароли не совпадают");

      await authApi.resetPasswordConfirmNewPassword(token, {
        new_password: form.password,
        confirm_password: form.password2,
      });

      showNotification({
        type: "success",
        title: "Пароль изменён",
        message: "Теперь можно войти в аккаунт с новым паролем",
      });

      return true;
    } catch (err) {
      setError(parseApiError(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    form,
    loading,
    error,
    handleChange,
    submit,
    closeModal,
  };
};