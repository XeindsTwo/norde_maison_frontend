import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "@/context/AuthContext";
import {useCart} from "@/hooks/useCart";
import {useSearch} from "@/context/SearchContext";
import SearchIcon from "@/assets/images/icons/bx_search.svg";
import CartIcon from "@/assets/images/icons/bx_cart.svg";
import CabinetIcon from "@/assets/images/icons/cabinet.svg";
import MobileMenuIcon from "@/assets/images/icons/menu-mobile.svg";
import './HeaderMobile.scss';

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {openSearch} = useSearch();
  const {openAuth, isAuth} = useAuth();
  const {data: cart} = useCart();

  const totalItems = cart?.items?.length || 0;

  return (
      <header className="header-mobile">
        <div className="header-mobile__info">
          <div className="container container--padding">
            <p className="header-mobile__info-inner">Минимализм, созданный для жизни.</p>
          </div>
        </div>

        <div className="container container--padding">
          <div className="header-mobile__top">
            <div className="header-mobile__left">
              <button
                  className="header-mobile__hamburger header-mobile__btn"
                  onClick={() => setIsMenuOpen(true)}
                  type="button"
              >
                <MobileMenuIcon />
              </button>
              <button className="header-mobile__search header-mobile__btn" type="button" onClick={openSearch}>
                <SearchIcon />
              </button>
            </div>

            <Link to="/" className="header-mobile__logo">
              <img src="/images/logo.svg" width={189} height={24} alt="Nordé Maison"/>
            </Link>

            <div className="header-mobile__right">
              {isAuth ? (
                  <Link className="header-mobile__user header-mobile__btn" to="/profile">
                    <CabinetIcon />
                  </Link>
              ) : (
                  <button className="header-mobile__user header-mobile__btn" onClick={openAuth} type="button">
                    <CabinetIcon />
                  </button>
              )}
              {isAuth ? (
                  <Link
                      className="header-mobile__cart header-mobile__btn"
                      to="/cart"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    <CartIcon />
                    {totalItems > 0 && <span className="header-mobile__cart-badge">{totalItems}</span>}
                  </Link>
              ) : (
                  <button
                      className="header-mobile__cart header-mobile__btn"
                      type="button"
                      onClick={openAuth}
                  >
                    <CartIcon />
                    {totalItems > 0 && <span className="header-mobile__cart-badge">{totalItems}</span>}
                  </button>
              )}
            </div>
          </div>
        </div>

        {isMenuOpen && (
            <div className="header-mobile__menu">
              <div className="container">
                <ul className="header-mobile__menu-list">
                  <li className="header-mobile__menu-item">
                    <Link
                        to="/women"
                        className="header-mobile__menu-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      Женщинам
                    </Link>
                  </li>
                  <li className="header-mobile__menu-item">
                    <Link
                        to="/men"
                        className="header-mobile__menu-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      Мужчинам
                    </Link>
                  </li>
                  <li className="header-mobile__menu-item">
                    <Link
                        to="/about"
                        className="header-mobile__menu-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      О нас
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
        )}
      </header>
  );
};

export default HeaderMobile;