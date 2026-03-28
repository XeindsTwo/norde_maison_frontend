import "@/components/Modals/Modals.scss";
import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import { useAuth } from "@/context/AuthContext";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";

const ResetPasswordSuccessModal = () => {
  const { resetSuccessOpen, closeResetSuccess } = useAuth();

  return (
    <AnimatedModal
      isOpen={resetSuccessOpen}
      onClose={closeResetSuccess}
      width="654px"
    >
      <div className="modal__top">
        <h3 className="modal__title">Письмо отправлено</h3>
        <button
          className="modal__close"
          onClick={closeResetSuccess}
          type="button"
        >
          <CrossArrow />
        </button>
      </div>

      <div className="modal__inner">
        <p className="modal__text short">
          Мы отправили письмо на вашу почту. Откройте его и нажмите ссылку, чтобы сбросить пароль.
        </p>

        <div className="modal__actions one">
          <button
            className="modal__btn btn"
            style={{ marginTop: 24 }}
            onClick={closeResetSuccess}
          >
            Закрыть окно
          </button>
        </div>
      </div>
    </AnimatedModal>
  );
};

export default ResetPasswordSuccessModal;