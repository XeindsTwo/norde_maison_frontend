import "@/components/Modals/Modals.scss";
import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import {useAuth} from "@/context/AuthContext";

const SuccessModal = () => {

  const {successOpen, closeSuccess} = useAuth();

  return (
    <AnimatedModal
      isOpen={successOpen}
      onClose={closeSuccess}
      width="520px"
    >
      <button
        className="auth-modal__close"
        onClick={closeSuccess}
        type="button"
      >
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
    </AnimatedModal>
  );
};

export default SuccessModal;