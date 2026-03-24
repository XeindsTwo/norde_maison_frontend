import IconMan from '@/assets/images/size-quiz/man.svg';
import IconWoman from '@/assets/images/size-quiz/woman.svg';

const options = [
  { key: 'male', label: 'Мужской', Icon: IconMan },
  { key: 'female', label: 'Женский', Icon: IconWoman },
];

const StepGender = ({ form, updateForm, goToStep }) => {
  const { gender } = form;

  const handleSelect = (key) => {
    updateForm({ gender: key });
    goToStep(1);
  };

  return (
    <div className="sizequiz__center">
      <h3 className="sizequiz__question">Выберите свой пол</h3>
      <div className="sizequiz__gender-grid">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`sizequiz__gender-btn ${gender === opt.key ? 'is-active' : ''}`}
            onClick={() => handleSelect(opt.key)}
          >
            <opt.Icon
              className="sizequiz__gender-icon"
              width="34"
              height="34"
            />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

StepGender.canNext = () => false;
export default StepGender;