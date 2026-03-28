import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthForm } from "./hooks/useAuthForm";
import AuthTabs from "./components/AuthTabs/AuthTabs.jsx";
import AuthField from "./components/AuthField/AuthField.jsx";
import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";
import "./AuthModal.scss";

const AuthModal = () => {
  const {
    authOpen,
    closeAuth,
    openResetSuccess,
  } = useAuth();

  const [mode, setMode] = useState("register");
  const [step, setStep] = useState("auth");

  const {
    form,
    error,
    loading,
    handleChange,
    handleSubmit,
    resetForm,
  } = useAuthForm(mode, step);

  const isLogin = mode === "login";
  const isForgot = step === "forgot";

  const isDisabled =
    loading ||
    !form.email ||
    (step === "auth" && !isLogin && !form.password) ||
    (step === "auth" && isLogin && !form.password) ||
    (step === "auth" && !isLogin && form.password2 && form.password !== form.password2);

  const openForgot = () => {
    resetForm();
    setStep("forgot");
  };

  const handleClose = () => {
    resetForm();
    setMode("register");
    setStep("auth");
    closeAuth();
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const ok = await handleSubmit();

    if (ok && isForgot) {
      handleClose();
      openResetSuccess();
    }
  };

  return (
    <AnimatedModal isOpen={authOpen} onClose={handleClose}>
      <div className="modal__top">
        {!isForgot ? (
          <AuthTabs mode={mode} onSwitch={setMode} />
        ) : (
          <h3 className="modal__title">Восстановление пароля</h3>
        )}

        <button className="modal__close" onClick={handleClose} type="button">
          <CrossArrow />
        </button>
      </div>

      <form
        key={`${mode}-${step}`}
        className="modal__inner"
        onSubmit={handleSubmitForm}
        autoComplete="off"
      >
        {error && <div className="modal__error">{error}</div>}

        {isForgot ? (
          <>
            <p className="modal__text bottom">
              Мы отправим Вам письмо с ссылкой для смены пароля
            </p>

            <AuthField
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@yandex.ru"
              autoComplete="email"
            />

            <div className="modal__actions one">
              <button
                type="submit"
                className="btn modal__btn"
                disabled={loading || !form.email}
              >
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </>
        ) : (
          <>
            {!isLogin && (
              <>
                <AuthField
                  label="Имя"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Иван"
                  autoComplete="off"
                />

                <AuthField
                  label="Фамилия"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Иванов"
                  autoComplete="off"
                />
              </>
            )}

            <AuthField
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@yandex.ru"
              autoComplete="email"
            />

            <AuthField
              label="Пароль"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              resetToggleSignal={`${mode}-${step}`}
              autoComplete={isLogin ? "current-password" : "new-password"}
              rightAction={
                isLogin ? (
                  <button
                    type="button"
                    className="auth-field__forgot"
                    onClick={openForgot}
                  >
                    Забыли пароль? <span>Восстановить</span>
                  </button>
                ) : null
              }
            />

            {!isLogin && (
              <AuthField
                label="Повторите пароль"
                name="password2"
                type="password"
                value={form.password2}
                onChange={handleChange}
                placeholder="Введите пароль"
                resetToggleSignal={`${mode}-${step}`}
                autoComplete="new-password"
              />
            )}

            <div className="modal__actions one">
              <button
                type="submit"
                className="btn modal__btn"
                disabled={isDisabled}
              >
                {loading
                  ? "Загрузка..."
                  : isLogin
                    ? "Войти"
                    : "Создать аккаунт"}
              </button>
            </div>
          </>
        )}
      </form>
    </AnimatedModal>
  );
};

export default AuthModal;