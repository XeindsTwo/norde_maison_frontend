// steps/StepChest.jsx
const options = [
  { key: 'narrow', label: 'УЗКАЯ' },
  { key: 'medium', label: 'СРЕДНЯЯ' },
  { key: 'wide', label: 'ШИРОКАЯ' },
];

const StepChest = ({ form, updateForm, goToStep, currentStep }) => {
  const { chestShape } = form;

  const handleSelect = (key) => {
    updateForm({ chestShape: key });
    goToStep(currentStep + 1); // авто к Waist
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
            <div className="sizequiz__chest-img" />
            <div className="sizequiz__chest-label">{opt.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

StepChest.canNext = () => false; // авто-next
export default StepChest;
