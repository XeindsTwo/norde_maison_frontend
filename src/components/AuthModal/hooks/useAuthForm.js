import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const useAuthForm = (mode) => {

  const { login, register } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetError = () => setError("");

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {

    resetError();

    try {
      setLoading(true);

      if (mode === "register") {

        setLoading(true);

        if (!form.email.includes("@")) {
          setError("Введите корректный email");
          setLoading(false);
          return;
        }

        if (form.password.length < 6)
          return setError("Минимум 6 символов");

        if (form.password !== form.password2)
          return setError("Пароли не совпадают");

        await register(form);
      }

      if (mode === "login") {

        if (!form.email || !form.password)
          return setError("Заполните поля");

        await login({
          email: form.email,
          password: form.password
        });
      }

    } catch (err) {

      let backendError =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Ошибка авторизации";

      if (backendError === "Неверные данные") {
        backendError = "Неверный логин или пароль";
      }

      setError(backendError);

    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    loading,
    handleChange,
    handleSubmit,
    resetError
  };
};