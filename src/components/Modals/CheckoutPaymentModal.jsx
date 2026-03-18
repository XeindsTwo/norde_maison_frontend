import AnimatedModal from "@/components/Modals/ui/AnimatedModal";

const CheckoutPaymentModal = ({ isOpen, paymentUrl, onClose }) => {
  if (!isOpen || !paymentUrl) return null;

  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}
      width="100%"
      height="90vh"
      preventCloseOnBackdrop={true}
    >
      <iframe
        src={paymentUrl}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "#f8f9fa"
        }}
        title="Оплата заказа"
      />
    </AnimatedModal>
  );
};

export default CheckoutPaymentModal;