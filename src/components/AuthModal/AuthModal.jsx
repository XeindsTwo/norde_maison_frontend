import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import "./AuthModal.scss";

const AuthModal = ({isOpen, onClose}) => {

  const [mode, setMode] = useState("register");

  useEffect(() => {
    if (!isOpen) return;

    const escHandler = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);

  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const switchMode = (next) => {
    if (next !== mode) setMode(next);
  };

  const backdropVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
    exit: {opacity: 0, transition: {duration: 0.25}}
  };

  const modalVariants = {
    hidden: {
      y: -40,
      opacity: 0,
      scale: 0.97
    },

    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 25
      }
    },

    exit: {
      y: 40,
      opacity: 0,
      scale: 0.97,
      transition: {
        duration: 0.2
      }
    }
  };

  const formVariants = {
    hiddenLeft: {x: -30, opacity: 0},
    hiddenRight: {x: 30, opacity: 0},
    visible: {
      x: 0,
      opacity: 1,
      transition: {duration: 0.22}
    },
    exitLeft: {x: -30, opacity: 0, transition: {duration: 0.18}},
    exitRight: {x: 30, opacity: 0, transition: {duration: 0.18}}
  };

  return (
    <AnimatePresence mode="wait">

      {isOpen && (
        <motion.div
          className="auth-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >

          <motion.div
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="auth-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>

            <div className="auth-modal__tabs">
              <button
                className={
                  "auth-modal__tab" +
                  (mode === "register" ? " auth-modal__tab--active" : "")
                }
                onClick={() => switchMode("register")}
              >
                Регистрация
              </button>

              <span className="auth-modal__slash">/</span>

              <button
                className={
                  "auth-modal__tab" +
                  (mode === "login" ? " auth-modal__tab--active" : "")
                }
                onClick={() => switchMode("login")}
              >
                Вход
              </button>
            </div>

            <AnimatePresence mode="wait">

              {mode === "register" ? (
                <motion.div
                  key="register"
                  className="auth-form"
                  variants={formVariants}
                  initial="hiddenRight"
                  animate="visible"
                  exit="exitLeft"
                >
                  <div className="auth-field">
                    <label>Имя</label>
                    <input type="text" placeholder="Имя"/>
                  </div>

                  <div className="auth-field">
                    <label>Фамилия</label>
                    <input type="text" placeholder="Фамилия"/>
                  </div>

                  <div className="auth-field">
                    <label>E-mail</label>
                    <input type="email"/>
                  </div>

                  <div className="auth-field">
                    <label>Пароль</label>
                    <input type="password"/>
                  </div>

                  <div className="auth-field">
                    <label>Повторите пароль</label>
                    <input type="password"/>
                  </div>

                  <button className="auth-primary-btn">
                    Создать аккаунт
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  className="auth-form"
                  variants={formVariants}
                  initial="hiddenLeft"
                  animate="visible"
                  exit="exitRight"
                >
                  <div className="auth-field">
                    <label>E-mail</label>
                    <input type="email"/>
                  </div>

                  <div className="auth-field">
                    <label>Пароль</label>
                    <input type="password"/>
                  </div>

                  <div className="auth-modal__forgot">
                    <button type="button">Забыли пароль?</button>
                    <button type="button">Восстановить</button>
                  </div>

                  <button className="auth-primary-btn">
                    Войти
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default AuthModal;