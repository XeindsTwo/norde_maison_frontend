import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useAuthForm} from "./hooks/useAuthForm";
import AuthTabs from "./components/AuthTabs.jsx";
import AuthField from "./components/AuthField";
import {useAuth} from "@/context/AuthContext";
import "./AuthModal.scss";

const AuthModal = () => {

  const {authOpen, closeAuth} = useAuth();
  const [mode, setMode] = useState("register");

  const {
    form,
    error,
    delayedError,
    loading,
    handleChange,
    handleSubmit,
    resetError
  } = useAuthForm(mode);

  // Очистка ошибок при открытии modal или смене mode
  useEffect(() => {
    resetError();
  }, [authOpen, mode, resetError]);

  useEffect(() => {
    if (!authOpen) return;

    const escHandler = (e) => {
      if (e.key === "Escape") closeAuth();
    };

    document.addEventListener("keydown", escHandler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "";
    };

  }, [authOpen, closeAuth]);

  if (!authOpen) return null;

  return (
    <AnimatePresence>

      <motion.div
        className="auth-backdrop"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        onClick={closeAuth}
      >

        <motion.div
          className="auth-modal"
          initial={{y: -40, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: 40, opacity: 0}}
          onClick={e => e.stopPropagation()}
        >

          <button className="auth-modal__close" onClick={closeAuth}>
            ×
          </button>

          <AuthTabs mode={mode} onSwitch={setMode}/>

          {(error || delayedError) && (
            <div className="auth-error">
              {delayedError || error}
            </div>
          )}

          <div className="auth-form">

            {mode === "register" && (
              <>
                <AuthField
                  label="Имя"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />

                <AuthField
                  label="Фамилия"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </>
            )}

            <AuthField
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <AuthField
              label="Пароль"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />

            {mode === "register" && (
              <AuthField
                label="Повторите пароль"
                name="password2"
                type="password"
                value={form.password2}
                onChange={handleChange}
              />
            )}

            <button
              className="auth-primary-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "..."
                : mode === "register"
                  ? "Создать аккаунт"
                  : "Войти"}
            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
};

export default AuthModal;