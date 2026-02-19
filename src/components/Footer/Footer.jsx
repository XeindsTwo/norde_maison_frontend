import "./Footer.scss";
import SearchIcon from '@/assets/images/icons/bx_search.svg';
import CartIcon from '@/assets/images/icons/bx_cart.svg';
import ArrowTopIcon from '@/assets/images/icons/arrow-top.svg';
import ButtonValute from '@/assets/images/icons/button-valute.svg';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container container--padding">
          <div className="footer__top-inner">
            <div className="footer__left">
              <img
                src="/images/logo.svg"
                width={189}
                height={24}
                alt="Norde Maison"
              />
            </div>
            <nav className="footer__nav">
              <Link className="footer__link" to="">
                Авторизация
              </Link>
              <Link className="footer__link" to="">
                <SearchIcon/>
                Поиск
              </Link>
              <Link className="footer__link" to="">
                <CartIcon/>
                Корзина
              </Link>
            </nav>
            <div className="footer__right">
              <a className="footer__up" href="">
                Наверх
                <ArrowTopIcon/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container container--padding">
        <div className="footer__bottom">
          <div className="footer__valute">
            <button className="footer__btn">
              Российская Федерация (RUB ₽)
              <ButtonValute/>
            </button>
          </div>
          <p className="footer__author">Все права защищены © Norde Maison, 2026</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer