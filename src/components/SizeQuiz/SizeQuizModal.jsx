import {useState, useCallback} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import AnimatedModal from '@/components/Modals/ui/AnimatedModal';
import CrossArrow from '@/assets/images/icons/cross-modal.svg';
import ArrowBack from '@/assets/images/size-quiz/arrow-back.svg';
import ArrowNext from '@/assets/images/size-quiz/arrow-next.svg';

import StepGender from './steps/StepGender';
import StepParams from './steps/StepParams';
import StepAge from './steps/StepAge';
import StepChest from './steps/StepChest';
import StepWaist from './steps/StepWaist';
import StepHips from './steps/StepHips';
import StepResult from './steps/StepResult';

import './SizeQuizModal.scss';

const steps = [
  StepGender,
  StepParams,
  StepAge,
  StepChest,
  StepWaist,
  StepHips,
  StepResult,
];

const initialForm = {
  gender: null,
  height: '',
  weight: '',
  age: '',
  fit: 0,
  chestShape: null,
  waistShape: null,
  hipsShape: null,
};

const stepsWithButtons = [1, 2];

const SizeQuizModal = ({isOpen, onClose}) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);

  const StepComponent = steps[step];
  const isLast = step === steps.length - 1;
  const showButtons = stepsWithButtons.includes(step);

  const updateForm = useCallback((patch) => {
    setForm((prev) => ({...prev, ...patch}));
  }, []);

  const canNext = StepComponent.canNext ? StepComponent.canNext(form) : true;

  const goNext = () => {
    if (!canNext) return;
    if (!isLast) setStep((s) => s + 1);
  };

  const goPrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const resetQuiz = () => {
    setStep(0);
    setForm(initialForm);
  };

  const handleClose = () => {
    onClose?.();
    resetQuiz();
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={handleClose} width="720px">
      <div className="modal__top">
        <div className="sizequiz__header">
          {/* УБРАЛИ счётчик шагов */}
          <h3 className="modal__title">Какой у меня размер?</h3>
        </div>

        <button className="modal__close" onClick={handleClose}>
          <CrossArrow/>
        </button>
      </div>

      <div className="modal__inner sizequiz__inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -20}}
            transition={{duration: 0.2}}
          >
            <StepComponent
              form={form}
              updateForm={updateForm}
              goToStep={setStep}
              currentStep={step}
            />
          </motion.div>
        </AnimatePresence>

        {showButtons && (
          <div className="modal__actions between sizequiz__actions">
            <button
              onClick={goPrev}
              disabled={step === 0}
              className="modal__btn--small btn modal__btn modal__btn--cancel"
            >
              <ArrowBack/>
              Назад
            </button>

            <button
              onClick={goNext}
              disabled={!canNext}
              className="modal__btn--small btn modal__btn"
            >
              Далее
              <ArrowNext/>
            </button>
          </div>
        )}

        {isLast && (
          <div className="modal__actions between sizequiz__actions">
            <button
              onClick={resetQuiz}
              className="btn modal__btn modal__btn--cancel modal__btn--small"
            >
              Пройти заново
            </button>

            <button
              onClick={handleClose}
              className="btn modal__btn modal__btn--small"
            >
              Завершить
            </button>
          </div>
        )}
      </div>
    </AnimatedModal>
  );
};

export default SizeQuizModal;