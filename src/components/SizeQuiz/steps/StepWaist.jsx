const options = [
  { key: 'narrow', label: 'УЗКАЯ' },
  { key: 'medium', label: 'СРЕДНЯЯ' },
  { key: 'wide', label: 'ШИРОКАЯ' },
];

const StepWaist = ({ form, updateForm, goToStep, currentStep }) => {
  const { waistShape } = form;

  const handleSelect = (key) => {
    updateForm({ waistShape: key });
    goToStep(currentStep + 1);
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
            <div className="sizequiz__chest-img" />
            <div className="sizequiz__chest-label">{opt.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

StepWaist.canNext = () => false; // авто-next
export default StepWaist;