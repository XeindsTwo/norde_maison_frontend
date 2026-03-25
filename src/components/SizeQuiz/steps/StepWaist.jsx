import CheckIcon from '@/assets/images/size-quiz/check-icon.svg';

const images = {
  narrow: '/images/waist/1.png',
  medium: '/images/waist/2.png',
  wide: '/images/waist/3.png',
};

const options = [
  { key: 'narrow', label: 'УЗКАЯ' },
  { key: 'medium', label: 'СРЕДНЯЯ' },
  { key: 'wide', label: 'ШИРОКАЯ' },
];

const StepWaist = ({ form, updateForm, currentStep }) => {
  const { waistShape } = form;

  const handleSelect = (key) => {
    updateForm({ waistShape: key });
  };

  return (
    <div className="sizequiz__chest">
      <div className="sizequiz__question">Талия</div>
      <div className="sizequiz__subtitle">
        Выберите изображение, наиболее похожее на вашу форму
      </div>

      <div className="sizequiz__chest-grid">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`sizequiz__chest-card ${waistShape === opt.key ? 'is-active' : ''}`}
            onClick={() => handleSelect(opt.key)}
          >
            <div className="sizequiz__chest-img">
              <img src={images[opt.key]} alt={opt.label} />
            </div>
            <div className="sizequiz__select-label">
              {waistShape === opt.key && <CheckIcon />}
              {opt.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

StepWaist.canNext = (form) => form.waistShape !== null;

export default StepWaist;