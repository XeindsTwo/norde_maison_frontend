import "@/components/Modals/Modals.scss";
import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import {useAuth} from "@/context/AuthContext";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";
import AuthTabs from "@/components/Modals/AuthModal/components/AuthTabs/AuthTabs.jsx";

const SuccessModal = () => {

  const {successOpen, closeSuccess} = useAuth();

  return (
    <AnimatedModal
      isOpen={successOpen}
      onClose={closeSuccess}
      width="520px"
    >
      <div className="modal__top">
        <h3 className="modal__title">Регистрация успешно выполнена</h3>
        <button
          className="modal__close"
          onClick={closeSuccess}
          type="button"
        >
          <CrossArrow/>
        </button>
      </div>
      <div className="modal__inner">
        <p className="modal__text short">
          Проверьте свой почтовый ящик для дальнейшего подтверждения аккаунта
        </p>
        <div className="modal__actions one">
          <button
            className="modal__btn btn"
            style={{marginTop: 24}}
            onClick={closeSuccess}
          >
            Закрыть окно
          </button>
        </div>
      </div>
    </AnimatedModal>
  );
};

export default SuccessModal;