import "./Footer.scss";

const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer__top">
          <div className="container container--padding">
            <div className="footer__top-inner">
              <img src="/images/logo.svg" alt=""/>
              <nav className="footer__nav">
                <a className="footer__link" href="">
                  Авторизация
                </a>
                <a className="footer__link" href="">
                  Поиск
                </a>
                <a className="footer__link" href="">
                  Корзина
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer;