import "@/components/Modals/Modals.scss";
import {useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";

const AnimatedModal = ({
                         isOpen,
                         onClose,
                         children,
                         width = "654px"
                       }) => {

  useEffect(() => {
    if (!isOpen) return;

    const escHandler = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", escHandler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "";
    };

  }, [isOpen, onClose]);

  const backdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal__backdrop"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
          onMouseDown={backdropClick}
        >
          <motion.div
            className="modal"
            style={{width}}
            initial={{y: -30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 30, opacity: 0}}
            transition={{duration: 0.2}}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;