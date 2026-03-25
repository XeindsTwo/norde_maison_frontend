import CheckIcon from '@/assets/images/size-quiz/check-icon.svg';

const images = {
  narrow: '/images/hips/1.png',
  medium: '/images/hips/2.png',
  wide: '/images/hips/3.png',
};

const options = [
  { key: 'narrow', label: 'УЗКИЕ' },
  { key: 'medium', label: 'СРЕДНИЕ' },
  { key: 'wide', label: 'ШИРОКИЕ' },
];

const StepHips = ({ form, updateForm, currentStep }) => {
  const { hipsShape } = form;

  const handleSelect = (key) => {
    updateForm({ hipsShape: key });
  };

  return (
    <div className="sizequiz__chest">
      <div className="sizequiz__question">Бёдра</div>
      <div className="sizequiz__subtitle">
        Выберите изображение, наиболее похожее на вашу форму
      </div>

      <div className="sizequiz__chest-grid">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`sizequiz__chest-card ${hipsShape === opt.key ? 'is-active' : ''}`}
            onClick={() => handleSelect(opt.key)}
          >
            <div className="sizequiz__chest-img">
              <img src={images[opt.key]} alt={opt.label} />
            </div>
            <div className="sizequiz__select-label">
              {hipsShape === opt.key && <CheckIcon />}
              {opt.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

StepHips.canNext = (form) => form.hipsShape !== null;

export default StepHips;