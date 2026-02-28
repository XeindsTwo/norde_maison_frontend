import {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {parseApiError} from "@/utils/apiError";

export const useAuthForm = (mode) => {
  const {login, register} = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setErrorTimed = (message, timeout = 3000) => {
    setError(message);

    setTimeout(() => {
      setError("");
    }, timeout);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: ""
    });
  };

  const handleSubmit = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      if (mode === "register") {

        if (!form.email.includes("@")) {
          throw new Error("Введите корректный email");
        }

        if (form.password.length < 8) {
          throw new Error("В пароле должно быть минимум 8 символов");
        }

        if (form.password !== form.password2) {
          throw new Error("Введенные пароли не совпадают");
        }

        await register(form);
        resetForm();
      }

      if (mode === "login") {

        if (!form.email || !form.password) {
          throw new Error("Заполните поля");
        }

        await login({
          email: form.email,
          password: form.password
        });

        resetForm();
      }

    } catch (err) {
      setErrorTimed(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    loading,
    handleChange,
    handleSubmit
  };
};