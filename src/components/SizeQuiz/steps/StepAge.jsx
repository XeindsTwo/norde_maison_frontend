const StepAge = ({form, updateForm}) => {
  const {age} = form;

  return (
    <div className="sizequiz__params">
      <div className="sizequiz__question">Возраст</div>
      <div className="sizequiz__inputs">
        <div className="sizequiz__field">
          <label className="sizequiz__label">Ваш возраст</label>
          <input
            type="number"
            min={16}
            max={80}
            className="sizequiz__input"
            placeholder="Ваш возраст в годах"
            value={age || ''}
            onChange={(e) => updateForm({age: e.target.value})}
          />
        </div>
      </div>
    </div>
  );
};

StepAge.canNext = (form) => !!form.age && Number(form.age) >= 16;
export default StepAge;
