import "./AuthTabs.scss";

const AuthTabs = ({mode, onSwitch}) => {
  return (
    <div className="auth-tabs">
      <button
        className={`auth-tabs__tab ${mode === "register" ? "auth-tabs__tab--active" : ""}`}
        onClick={() => onSwitch("register")}
      >
        Регистрация
      </button>

      <span className="auth-tabs__slash">/</span>

      <button
        className={`auth-tabs__tab ${mode === "login" ? "auth-tabs__tab--active" : ""}`}
        onClick={() => onSwitch("login")}
      >
        Вход
      </button>
    </div>
  );
};

export default AuthTabs;