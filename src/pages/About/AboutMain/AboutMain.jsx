import "./AboutMain.scss";

const AboutMain = () => {
  return (
    <section className="about-main">
      <div className="container container--padding">
        <img className="about-main__img" src="/images/about.png" width="1147" height="627" alt=""/>
        <h1 className="about-main__title">Nordé Maison — <br/>
          Одежда, в которой спокойно.
        </h1>
        <p className="about-main__text">
          Мы создаём вещи, которые живут долго. Без логомании, без спешки, без избыточности.
          Только форма, комфорт и честные материалы.
        </p>
      </div>
    </section>
  )
}

export default AboutMain;