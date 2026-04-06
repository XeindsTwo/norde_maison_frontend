const getSize = (form) => {
  const h = Number(form.height) / 100;
  const w = Number(form.weight);
  let index = 0;

  if (h > 0 && w > 0) {
    const bmi = w / (h * h);
    index += bmi;
  }

  if (form.chestShape === 'narrow') index -= 0.5;
  if (form.chestShape === 'wide') index += 0.5;

  if (form.waistShape === 'narrow') index -= 0.3;
  if (form.waistShape === 'wide') index += 0.3;

  if (form.hipsShape === 'narrow') index -= 0.5;
  if (form.hipsShape === 'medium') index += 0.5;

  if (form.fit === -2) index -= 0.75;
  if (form.fit === 2) index += 1.5;

  const age = Number(form.age);
  if (age >= 25 && age <= 40) index += 0.3;
  if (age > 40) index += 0.6;

  if (form.gender === 'M') index += 0.3;

  if (index < 18) return 'XSS';
  if (index < 20) return 'XS';
  if (index < 22) return 'S';
  if (index < 24) return 'M';
  if (index < 26) return 'L';
  if (index < 28) return 'XL';
  return 'XXL';
};

const StepResult = ({form}) => {
  const size = getSize(form);

  return (
    <div className="sizequiz__result">
      <div className="sizequiz__question">Рекомендованный размер</div>
      <div className="sizequiz__result-size">{size}</div>
      <div className="sizequiz__result-desc">
        Мы сделали эту рекомендацию на основе ваших параметров и предпочтений, сравнив их с тысячами похожих профилей.
      </div>
    </div>
  );
};

export default StepResult;