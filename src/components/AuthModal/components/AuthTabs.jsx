const AuthTabs = ({ mode, onSwitch }) => {

  return (
    <div className="auth-modal__tabs">

      <button
        className={`auth-modal__tab ${mode === "register" ? "auth-modal__tab--active" : ""}`}
        onClick={() => onSwitch("register")}
      >
        Регистрация
      </button>

      <span className="auth-modal__slash">/</span>

      <button
        className={`auth-modal__tab ${mode === "login" ? "auth-modal__tab--active" : ""}`}
        onClick={() => onSwitch("login")}
      >
        Вход
      </button>

    </div>
  );
};

export default AuthTabs;