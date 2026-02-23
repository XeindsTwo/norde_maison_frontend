import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import "./AuthModal.scss";

const AuthModal = ({isOpen, onClose}) => {
  const [mode, setMode] = useState("register"); // "login" | "register"

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
  };

  const backdropVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  };

  const modalVariants = {
    hidden: {y: -40, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {type: "spring", stiffness: 260, damping: 20},
    },
    exit: {y: -40, opacity: 0},
  };

  const formVariants = {
    hiddenLeft: {x: -40, opacity: 0},
    hiddenRight: {x: 40, opacity: 0},
    visible: {
      x: 0,
      opacity: 1,
      transition: {duration: 0.25},
    },
    exitLeft: {x: -40, opacity: 0, transition: {duration: 0.2}},
    exitRight: {x: 40, opacity: 0, transition: {duration: 0.2}},
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="auth-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="auth-modal__close" onClick={onClose}>
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
                    <input type="text" placeholder="example@yandex.ru"/>
                  </div>
                  <div className="auth-field">
                    <label>Фамилия</label>
                    <input type="text" placeholder="example@yandex.ru"/>
                  </div>
                  <div className="auth-field">
                    <label>E-mail</label>
                    <input type="email" placeholder="example@yandex.ru"/>
                  </div>
                  <div className="auth-field">
                    <label>Пароль</label>
                    <input type="password" placeholder="Пароль"/>
                  </div>
                  <div className="auth-field">
                    <label>Повторите пароль</label>
                    <input type="password" placeholder="Пароль ещё раз"/>
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
                    <input type="email" placeholder="example@yandex.ru"/>
                  </div>
                  <div className="auth-field">
                    <label>Пароль</label>
                    <input type="password" placeholder="Пароль"/>
                  </div>

                  <div className="auth-modal__forgot">
                    <button type="button">Забыли пароль?</button>
                    <button type="button">Восстановить</button>
                  </div>

                  <button className="auth-primary-btn">Войти</button>
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