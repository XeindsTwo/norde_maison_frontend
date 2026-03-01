import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";

const CartDeleteConfirmModal = ({
                                  isOpen,
                                  onClose,
                                  onConfirm,
                                  loading = false
                                }) => {

  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}
      width="480px"
    >
      <div className="modal__top">
        <h3 className="modal__title">
          Удалить товар?
        </h3>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        >
          <CrossArrow/>
        </button>
      </div>

      <div className="modal__inner">
        <p className="modal__text">
          Вы действительно хотите удалить товар из корзины? Отменить действие будет невозможно
        </p>
        <div className="modal__actions">
          <button
            className="btn modal__btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Удаление..." : "Удалить"}
          </button>
          <button
            className="btn modal__btn modal__btn--cancel"
            onClick={onClose}
          >
            Отмена
          </button>
        </div>
      </div>
    </AnimatedModal>
  );
};

export default CartDeleteConfirmModal;