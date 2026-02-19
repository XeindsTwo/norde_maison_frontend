import "./Footer.scss";
import SearchIcon from '@/assets/images/icons/bx_search.svg';
import CartIcon from '@/assets/images/icons/bx_cart.svg';
import ArrowTopIcon from '@/assets/images/icons/arrow-top.svg';
import ButtonValute from '@/assets/images/icons/button-valute.svg';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

const handleScrollTop = (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const Footer = () => {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const valuteRef = useRef(null);

  useEffect(() => {
    if (!isCurrencyOpen) return;

    const handleClickOutside = (e) => {
      if (valuteRef.current && !valuteRef.current.contains(e.target)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCurrencyOpen]);

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
                <SearchIcon />
                Поиск
              </Link>
              <Link className="footer__link" to="">
                <CartIcon />
                Корзина
              </Link>
            </nav>
            <div className="footer__right">
              <button className="footer__up" type="button" onClick={handleScrollTop}>
                Наверх
                <ArrowTopIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container container--padding">
        <div className="footer__bottom">
          <div className="footer__valute" ref={valuteRef}>
            <button
              className={`footer__btn ${isCurrencyOpen ? 'is-open' : ''}`}
              type="button"
              onClick={() => setIsCurrencyOpen((v) => !v)}
            >
              Российская Федерация (RUB ₽)
              <ButtonValute />
            </button>

            <div className={`footer__valute-dropdown ${isCurrencyOpen ? 'footer__valute-dropdown--open' : ''}`}>
              <button className="footer__valute-item" type="button">
                Российская Федерация (RUB ₽)
              </button>
              <button className="footer__valute-item" type="button">
                Евросоюз (EUR €)
              </button>
              <button className="footer__valute-item" type="button">
                США (USD $)
              </button>
            </div>
          </div>

          <p className="footer__author">
            Все права защищены © Norde Maison, 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;