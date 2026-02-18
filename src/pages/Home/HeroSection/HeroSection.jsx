import './HeroSection.scss'
import {Link} from 'react-router-dom'

const HomeSection = () => {
  return (
    <section className="hero-section">
      <h1 className="hero-section__title">Магазин одежды Norde Maison</h1>
      <div className="container">
        <div className="hero-section__inner">
          <Link to="/men" className="hero-section__card">
            <img src="/images/one-home.png" alt="мужская коллекция одежды Norde Maison"/>
            <span className="btn btn--black hero-section__name">Мужская Коллекция</span>
          </Link>
          <Link to="/women" className="hero-section__card">
            <img src="/images/two-home.png" alt="женская коллекция одежды Norde Maison"/>
            <span className="btn btn--black hero-section__name">Женская Коллекция</span>
          </Link>
        </div>
      </div>
      <div className="container container--padding">
        <span className="hero-section__subtitle">Осознанная одежда</span>
        <p className="hero-section__description">
          Ответственная мода — не тренд, а естественная необходимость. В Norde Maison мы создаём вещи, которые уважают
          человека и окружающую среду. Каждая коллекция — это продуманный баланс формы, функции и этичного производства.
          Мы используем органические материалы и безопасные технологии, чтобы каждая покупка была выбором не только в
          пользу стиля, но и в пользу планеты.
        </p>
        <Link className="hero-section__btn btn" to="/about">Подробнее о нас</Link>
      </div>
    </section>
  )
}

export default HomeSection
