import FitSlider from "@/components/SizeQuiz/FitSlider/FitSlider.jsx";

const StepParams = ({form, updateForm}) => {
  const {height, weight, fit} = form;

  return (
    <div className="sizequiz__params">
      <div className="sizequiz__question small-bottom">Ваши параметры</div>

      <div className="sizequiz__inputs">
        <div className="sizequiz__field">
          <label className="sizequiz__label">Рост</label>
          <input
            type="number"
            className="sizequiz__input"
            placeholder="Ваш рост в см"
            value={height}
            onChange={(e) => updateForm({height: e.target.value})}
          />
        </div>

        <div className="sizequiz__field">
          <label className="sizequiz__label">Вес</label>
          <input
            type="number"
            className="sizequiz__input"
            placeholder="Ваш вес в кг"
            value={weight}
            onChange={(e) => updateForm({weight: e.target.value})}
          />
        </div>
        <div className="sizequiz__field last">
          <div className="sizequiz__label">Какую посадку предпочитаете?</div>
          <FitSlider value={fit} onChange={(fit) => updateForm({fit})}/>
        </div>
      </div>
    </div>
  );
};

StepParams.canNext = (form) => !!form.height && !!form.weight;
export default StepParams;