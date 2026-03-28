import "@/components/Modals/Modals.scss";
import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";
import AuthField from "@/components/Modals/AuthModal/components/AuthField/AuthField.jsx";
import {useResetPasswordForm} from "../hooks/useResetPasswordForm";

const ResetPasswordModal = () => {
  const {
    open,
    form,
    loading,
    error,
    handleChange,
    submit,
    closeModal,
  } = useResetPasswordForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submit();
    if (ok) {
      closeModal();
    }
  };

  return (
    <AnimatedModal isOpen={open} onClose={closeModal} width="654px">
      <div className="modal__top">
        <h3 className="modal__title">Смена пароля</h3>
        <button className="modal__close" onClick={closeModal} type="button">
          <CrossArrow />
        </button>
      </div>

      <form className="modal__inner" onSubmit={handleSubmit} autoComplete="off">
        <p className="modal__text bottom">
          Придумайте новый пароль для аккаунта
        </p>

        {error && <div className="modal__error">{error}</div>}

        <>
          <AuthField
            label="Пароль"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            autoComplete="new-password"
          />

          <AuthField
            label="Повторите пароль"
            name="password2"
            type="password"
            value={form.password2}
            onChange={handleChange}
            placeholder="Введите пароль"
            autoComplete="new-password"
          />

          <div className="modal__actions one">
            <button className="btn modal__btn" type="submit" disabled={loading}>
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </>
      </form>
    </AnimatedModal>
  );
};

export default ResetPasswordModal;