const getSize = (form) => {
  let score = 0;
  const h = Number(form.height), w = Number(form.weight), age = Number(form.age);

  if (h && w) {
    const bmi = w / Math.pow(h / 100, 2);
    score += bmi < 18.5 ? -1 : bmi > 27 ? 1 : 0;
    if (age > 50) score += 0.5;
  }

  score += form.fit;

  ['chestShape', 'waistShape', 'hipsShape'].forEach((shape) => {
    if (form[shape] === 'wide') score += 1;
    if (form[shape] === 'narrow') score -= 1;
  });

  if (score <= -2) return 'XS';
  if (score === -1) return 'S';
  if (score === 0) return 'M';
  if (score === 1) return 'L';
  return 'XL';
};

const StepResult = ({form}) => {
  const size = getSize(form);

  return (
    <div className="sizequiz__result">
      <div className="sizequiz__title">Ваш размер</div>
      <div className="sizequiz__result-size">{size}</div>
      <div className="sizequiz__result-desc">
        Рекомендуем брать размер {size} с учётом выбранной посадки
      </div>
    </div>
  );
};

export default StepResult;