import {AnimatePresence, motion} from "framer-motion";
import {useAuth} from "@/context/AuthContext";

const SuccessModal = () => {

  const {successOpen, closeSuccess} = useAuth();

  if (!successOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="auth-backdrop"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        onClick={closeSuccess}
      >
        <motion.div
          className="auth-modal"
          initial={{y: -40, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: 40, opacity: 0}}
          onClick={e => e.stopPropagation()}
        >

          <button className="auth-modal__close" onClick={closeSuccess}>
            ×
          </button>

          <h2>Регистрация успешна 🎉</h2>

          <p style={{marginTop: 16}}>
            Проверьте email для подтверждения аккаунта.
          </p>

          <button
            className="auth-primary-btn"
            style={{marginTop: 24}}
            onClick={closeSuccess}
          >
            Понятно
          </button>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessModal;