import "./GenderHero.scss";

const defaultTexts = {
  M: {
    title: 'Осознанная мужская одежда',
    description:
      'Минималистичная мужская одежда — это не тренд, а выбор в пользу качества и продуманности. Мы создаём вещи для современного мужчины, которому важны простота, комфорт и долговечность. Каждая модель выполнена из органичных материалов и проходит аккуратную обработку, чтобы служить дольше, сохранять форму и оставаться удобной каждый день.',
  },
  F: {
    title: 'Осознанная женская одежда',
    description:
      'Минималистичная женская одежда сочетает в себе простоту, функциональность и заботу об окружающей среде. В Norde Maison мы создаём вещи для современной женщины, ценящей чистые линии, комфорт и продуманный дизайн. Наши изделия выполнены из органичных материалов и безопасных технологий, обеспечивая удобство, долговечность и более осознанный подход к повседневному стилю.',
  },
};

const GenderHero = ({ gender, title, description }) => {
  const isMen = gender === 'M';
  const defaults = isMen ? defaultTexts.M : defaultTexts.F;

  const finalTitle = title || defaults.title;
  const finalDescription = description || defaults.description;

  return (
    <section className="gender__hero">
      <h1 className="gender__title">{finalTitle}</h1>
      <p className="gender__description">{finalDescription}</p>
    </section>
  );
};

export default GenderHero;