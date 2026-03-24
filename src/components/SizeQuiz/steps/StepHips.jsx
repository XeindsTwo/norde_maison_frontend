const options = [
  { key: 'narrow', label: 'УЗКИЕ' },
  { key: 'medium', label: 'СРЕДНИЕ' },
  { key: 'wide', label: 'ШИРОКИЕ' },
];

const StepHips = ({ form, updateForm, goToStep, currentStep }) => {
  const { hipsShape } = form;

  const handleSelect = (key) => {
    updateForm({ hipsShape: key });
    goToStep(currentStep + 1);
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
            <div className="sizequiz__chest-img" />
            <div className="sizequiz__chest-label">{opt.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

StepHips.canNext = () => false; // авто-next
export default StepHips;