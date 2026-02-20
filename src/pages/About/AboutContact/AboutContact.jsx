import "./AboutContact.scss";
import TelegramIcon from "@/assets/images/icons/tg-black.svg";

const AboutContact = () => {
  return (
    <section className="about-contact">
      <div className="container container--padding">
        <div className="about-contact__inner">
          <div className="about-contact__content">
            <h2 className="about-contact__title">Узнавайте больше о нашем деле</h2>
            <p className="about-contact__text">
              Мы рассказываем о жизни бренда, делимся идеями и процессом создания коллекций. Здесь появляются
              новости о новых линейках и проектах Norde Maison
            </p>
            <a className="about-contact__btn btn btn--black" href="https://web.telegram.org" target="_blank">
              <TelegramIcon/>
              Подписаться
            </a>
          </div>
          <img src="/images/telegram.svg" width="360" height="360" alt=""/>
        </div>
      </div>
    </section>
  )
}

export default AboutContact;