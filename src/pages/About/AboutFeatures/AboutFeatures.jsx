import "./AboutFeatures.scss";

const AboutFeatures = () => {
  return (
    <section className="about-features">
      <div className="container container--padding">
        <div className="about-features__grid">
          <article className="about-features__card about-features__card--1">
            <h3 className="about-features__subtitle">Личность</h3>
            <p className="about-features__description">
              Человек сегодня окружён шумом. Нам навязывают образы, скорости и желания, которые не наши.
              Истинная свобода — в том, чтобы замедлиться и услышать себя. Одежда может помочь в этом —
              стать тише, проще, ближе к сути.
            </p>
          </article>

          <article className="about-features__card about-features__card--2">
            <h3 className="about-features__subtitle">Рынок</h3>
            <p className="about-features__description">
              Массовое производство приучило нас к избыточности. Мода перестала быть личной — стала потоком.
              Мы возвращаем смысл одежде, делая меньше, но лучше. Norde Maison — за честные вещи, в которых
              есть дыхание и форма.
            </p>
          </article>

          <article className="about-features__card about-features__card--3">
            <h3 className="about-features__subtitle">Общество</h3>
            <p className="about-features__description">
              Сегодня принадлежность часто заменяет индивидуальность. Логотип стал новой формой
              самоидентификации. Мы не против брендов — мы против зависимости от них. Одежда Norde Maison —
              не символ, а инструмент спокойствия.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default AboutFeatures;