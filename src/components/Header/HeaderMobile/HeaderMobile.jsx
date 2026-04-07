import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useSearch } from "@/context/SearchContext";
import { useCurrency } from "@/context/CurrencyContext";
import SearchIcon from "@/assets/images/icons/bx_search.svg";
import CartIcon from "@/assets/images/icons/bx_cart.svg";
import CabinetIcon from "@/assets/images/icons/cabinet.svg";
import MobileMenuIcon from "@/assets/images/icons/menu-mobile.svg";
import HeaderMobileMenu from "./HeaderMobileMenu/HeaderMobileMenu.jsx";
import "./HeaderMobile.scss";

const MAP = {
  rub: { text: "Российская Федерация", symbol: "₽" },
  kzt: { text: "Российская Федерация", symbol: "₸" },
  byn: { text: "Республика Беларусь", symbol: "Br" },
};

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { openSearch } = useSearch();
  const { openAuth, isAuth } = useAuth();
  const { data: cart } = useCart();
  const { currency } = useCurrency();

  const totalItems = cart?.items?.length || 0;
  const data = MAP[currency] || MAP.rub;

  const handleMenuToggle = useCallback((open) => {
    document.body.classList.toggle("active", open);
    document.documentElement.style.overflowY = open ? "hidden" : "";
    setIsMenuOpen(open);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        handleMenuToggle(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, handleMenuToggle]);

  return (
    <header className="header-mobile" ref={menuRef}>
      <div className="header-mobile__info">
        <div className="container container--padding">
          <p className="header-mobile__info-inner">
            Минимализм, созданный для жизни.
          </p>
        </div>
      </div>

      <div className="container container--padding">
        <div className="header-mobile__top">
          <div className="header-mobile__left">
            <button
              className="header-mobile__hamburger header-mobile__btn"
              onClick={() => handleMenuToggle(true)}
              type="button"
            >
              <MobileMenuIcon />
            </button>

            <button
              className="header-mobile__search header-mobile__btn"
              type="button"
              onClick={openSearch}
            >
              <SearchIcon />
            </button>
          </div>

          <Link to="/" className="header-mobile__logo">
            <img
              src="/images/logo.svg"
              width={189}
              height={24}
              alt="Nordé Maison"
            />
          </Link>

          <div className="header-mobile__right">
            {isAuth ? (
              <Link
                className="header-mobile__user header-mobile__btn"
                to="/profile"
              >
                <CabinetIcon />
              </Link>
            ) : (
              <button
                className="header-mobile__user header-mobile__btn"
                onClick={openAuth}
                type="button"
              >
                <CabinetIcon />
              </button>
            )}

            {isAuth ? (
              <Link
                className="header-mobile__cart header-mobile__btn"
                to="/cart"
                onClick={() => handleMenuToggle(false)}
              >
                <CartIcon />
                {totalItems > 0 && (
                  <span className="header-mobile__cart-badge">
                    {totalItems}
                  </span>
                )}
              </Link>
            ) : (
              <button
                className="header-mobile__cart header-mobile__btn"
                type="button"
                onClick={openAuth}
              >
                <CartIcon />
                {totalItems > 0 && (
                  <span className="header-mobile__cart-badge">
                    {totalItems}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <HeaderMobileMenu
        isOpen={isMenuOpen}
        onClose={() => handleMenuToggle(false)}
        currencyData={data}
        currency={currency}
      />
    </header>
  );
};

export default HeaderMobile;