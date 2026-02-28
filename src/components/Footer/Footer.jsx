import "./Footer.scss";
import SearchIcon from '@/assets/images/icons/bx_search.svg';
import CartIcon from '@/assets/images/icons/bx_cart.svg';
import ArrowTopIcon from '@/assets/images/icons/arrow-top.svg';
import ButtonValute from '@/assets/images/icons/button-valute.svg';
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from 'react';
import {useCurrency} from "@/context/CurrencyContext";
import {useAuth} from "@/context/AuthContext";

const handleScrollTop = (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const currencyMap = {
  rub: "Россия (RUB ₽)",
  kzt: "Казахстан (KZT ₸)",
  byn: "Беларусь (BYN Br)",
};

const Footer = () => {
  const {isAuth, openAuth} = useAuth();
  const {currency, setCurrency} = useCurrency();
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

  const handleSelect = (val) => {
    setCurrency(val);
    setIsCurrencyOpen(false);
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container container--padding">
          <div className="footer__top-inner">
            <div className="footer__left">
              <Link to="/" className="header__logo">
                <img
                  src="/images/logo.svg"
                  width={189}
                  height={24}
                  alt="Nordé Maison"
                />
              </Link>
            </div>

            <nav className="footer__nav">
              {isAuth ? (
                <Link className="footer__link" to="/profile">
                  Личный кабинет
                </Link>
              ) : (
                <button
                  type="button"
                  className="footer__link"
                  onClick={openAuth}
                >
                  Авторизация
                </button>
              )}
              <button className="footer__link" type="button">
                <SearchIcon/>
                Поиск
              </button>
              {isAuth ? (
                <Link className="footer__link" to="/cart">
                  <CartIcon/>
                  Корзина
                </Link>
              ) : (
                <button
                  type="button"
                  className="footer__link"
                  onClick={openAuth}
                >
                  <CartIcon/>
                  Корзина
                </button>
              )}
            </nav>

            <div className="footer__right">
              <button className="footer__up" type="button" onClick={handleScrollTop}>
                Наверх
                <ArrowTopIcon/>
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
              {currencyMap[currency]}
              <ButtonValute/>
            </button>

            <div className={`footer__valute-dropdown ${isCurrencyOpen ? 'footer__valute-dropdown--open' : ''}`}>
              <button
                className="footer__valute-item"
                onClick={() => handleSelect("rub")}
              >
                Россия (RUB ₽)
              </button>

              <button
                className="footer__valute-item"
                onClick={() => handleSelect("kzt")}
              >
                Казахстан (KZT ₸)
              </button>

              <button
                className="footer__valute-item"
                onClick={() => handleSelect("byn")}
              >
                Беларусь (BYN Br)
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