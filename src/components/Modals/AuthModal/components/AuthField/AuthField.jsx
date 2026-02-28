import "./AuthField.scss"
import {useState, useEffect} from "react";
import ShowIcon from "@/assets/images/icons/show.svg";
import HideIcon from "@/assets/images/icons/hide.svg";

const AuthField = ({
                     label,
                     name,
                     type = "text",
                     value,
                     onChange,
                     placeholder,
                     resetToggleSignal,
                     autoComplete
                   }) => {

  const isPasswordField = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (resetToggleSignal) {
      setShowPassword(false);
    }
  }, [resetToggleSignal]);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const inputType =
    isPasswordField
      ? (showPassword ? "text" : "password")
      : type;

  return (
    <div className="auth-field">

      <div className="auth-field__top">
        <label className="auth-field__label">
          {label}
        </label>
      </div>

      <div className="auth-field__input-wrapper">
        <input
          type="text"
          style={{display: "none"}}
          autoComplete="username"
        />

        <input
          className="auth-field__input"
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete || "off"}
          data-lpignore="true"
        />

        {isPasswordField && (
          <button
            type="button"
            className="auth-field__toggle"
            onClick={togglePassword}
          >
            {showPassword
              ? <HideIcon width={22} height={22}/>
              : <ShowIcon width={22} height={22}/>
            }
          </button>
        )}

      </div>
    </div>
  );
};

export default AuthField;