import {useNavigate} from "react-router-dom";
import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";

const CheckoutSuccessModal = ({ isOpen, order, onClose, onViewOrder }) => {
  const navigate = useNavigate();

  const handleViewOrder = () => {
    onViewOrder(order);
  };

  const handleContinue = () => {
    onClose();
    navigate("/");
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose} width="654px">
      <div className="modal__top">
        <h3 className="modal__title">Ваш заказ успешно оформлен</h3>
        <button className="modal__close" type="button" onClick={onClose}>
          <CrossArrow/>
        </button>
      </div>
      <div className="modal__inner">
        <p className="modal__text">Вы можете отслеживать статус доставки в личном кабинете</p>
        <div className="modal__actions one">
          <button className="btn modal__btn" onClick={handleViewOrder}>
            Посмотреть заказ
          </button>
          <button className="btn modal__btn modal__btn--cancel" onClick={handleContinue}>
            Продолжить покупки
          </button>
        </div>
      </div>
    </AnimatedModal>
  );
};

export default CheckoutSuccessModal;