import CheckIcon from '@/assets/images/size-quiz/check-icon.svg';

const images = {
  narrow: '/images/chest/1.png',
  medium: '/images/chest/2.png',
  wide: '/images/chest/3.png',
};

const options = [
  { key: 'narrow', label: 'УЗКАЯ' },
  { key: 'medium', label: 'СРЕДНЯЯ' },
  { key: 'wide', label: 'ШИРОКАЯ' },
];

const StepChest = ({ form, updateForm, currentStep }) => {
  const { chestShape } = form;

  const handleSelect = (key) => {
    updateForm({ chestShape: key });
  };

  return (
    <div className="sizequiz__chest">
      <div className="sizequiz__question">Грудь</div>
      <div className="sizequiz__subtitle">
        Выберите изображение, наиболее похожее на вашу форму
      </div>

      <div className="sizequiz__chest-grid">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`sizequiz__chest-card ${chestShape === opt.key ? 'is-active' : ''}`}
            onClick={() => handleSelect(opt.key)}
          >
            <div className="sizequiz__chest-img">
              <img src={images[opt.key]} alt={opt.label} />
            </div>
            <div className="sizequiz__select-label">
              {chestShape === opt.key && <CheckIcon />}
              {opt.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

StepChest.canNext = (form) => form.chestShape !== null;

export default StepChest;