import {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {useAuthForm} from "./hooks/useAuthForm";
import AuthTabs from "./components/AuthTabs/AuthTabs.jsx";
import AuthField from "./components/AuthField/AuthField.jsx";
import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";
import "./AuthModal.scss";

const AuthModal = () => {

  const {authOpen, closeAuth} = useAuth();
  const [mode, setMode] = useState("register");

  const resetToggleSignal = mode;

  const {
    form,
    error,
    loading,
    handleChange,
    handleSubmit
  } = useAuthForm(mode);

  const isLogin = mode === "login";

  const isDisabled =
    loading ||
    !form.email ||
    !form.password ||
    (!isLogin &&
      form.password2 &&
      form.password !== form.password2);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <AnimatedModal
      isOpen={authOpen}
      onClose={closeAuth}
    >

      <div className="modal__top">
        <AuthTabs mode={mode} onSwitch={setMode}/>

        <button
          className="modal__close"
          onClick={closeAuth}
          type="button"
        >
          <CrossArrow/>
        </button>
      </div>

      <form
        key={mode}
        className="modal__inner"
        onSubmit={handleSubmitForm}
        autoComplete="off"
      >

        {error && <div className="modal__error">{error}</div>}

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
          resetToggleSignal={mode}
          autoComplete={isLogin ? "current-password" : "new-password"}
        />

        {!isLogin && (
          <AuthField
            label="Повторите пароль"
            name="password2"
            type="password"
            value={form.password2}
            onChange={handleChange}
            placeholder="Введите пароль"
            resetToggleSignal={mode}
            autoComplete="new-password"
          />
        )}

        <button
          type="submit"
          className="btn modal__primary-btn"
          disabled={isDisabled}
        >
          {loading
            ? "Загрузка..."
            : isLogin
              ? "Войти"
              : "Создать аккаунт"}
        </button>

      </form>

    </AnimatedModal>
  );
};

export default AuthModal;