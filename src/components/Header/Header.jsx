import {useEffect, useState, useRef} from 'react';
import './Header.scss';
import {getCategories, getSubcategories} from '@/api/catalog.js';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';
import SearchIcon from '@/assets/images/icons/bx_search.svg';
import CartIcon from '@/assets/images/icons/bx_cart.svg';
import {Link, useLocation} from 'react-router-dom';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null); // 'women' | 'men' | null
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [womenData, setWomenData] = useState({categories: [], materials: []});
  const [menData, setMenData] = useState({categories: [], materials: []});
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const closeTimeoutRef = useRef(null);
  const openTimeoutRef = useRef(null);

  // кто был кликнут и нужно ли игнорить первый hover
  const hoverLockRef = useRef({
    type: null,      // 'women' | 'men' | null
    locked: false,   // нужно ли игнорить первый hover
  });

  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          womenCategoriesRes,
          menCategoriesRes,
          materialsRes,
          subcatsRes,
        ] = await Promise.all([
          getCategories({gender: 'F', is_material: false}),
          getCategories({gender: 'M', is_material: false}),
          getCategories({is_material: true}),
          getSubcategories(),
        ]);

        const grouped = {};
        subcatsRes.data.forEach((sc) => {
          const id = sc.category.id;
          if (!grouped[id]) grouped[id] = [];
          grouped[id].push(sc);
        });

        setWomenData({
          categories: womenCategoriesRes.data,
          materials: materialsRes.data,
        });

        setMenData({
          categories: menCategoriesRes.data,
          materials: materialsRes.data,
        });

        setSubcategoriesByCategory(grouped);
      } catch (e) {
        console.error('Header load error:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {}, [location.pathname]);

  const clearTimers = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) return;

    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuVisible(false);

      setTimeout(() => {
        setOpenMenu(null);
      }, 400);

      closeTimeoutRef.current = null;
    }, 300);
  };

  const handleOpen = (type) => {
    const lock = hoverLockRef.current;

    if (lock.locked && lock.type === type) {
      hoverLockRef.current = {type: null, locked: false};
      return;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }

    openTimeoutRef.current = setTimeout(() => {
      setOpenMenu(type);
      setIsMenuVisible(true);
      openTimeoutRef.current = null;
    }, 150);
  };

  const handleLinkClick = (type) => {
    hoverLockRef.current = {
      type,
      locked: true,
    };
  };

  const currentData =
    openMenu === 'women'
      ? womenData
      : openMenu === 'men'
        ? menData
        : {categories: [], materials: []};

  return (
    <header className="header">
      <div className="header__info">
        <div className="container">
          <div className="header__info-inner">
            <span>Минимализм, созданный для жизни.</span>
            <span>Российская Федерация (RUB ₽)</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="header__top">
          <div className="header__left">
            <Link to="/" className="header__logo">
              <img
                src="/images/logo.svg"
                width={189}
                height={24}
                alt="Nordé Maison"
              />
            </Link>

            <nav
              className="header__nav"
              onMouseEnter={clearTimers}
              onMouseLeave={scheduleClose}
            >
              <Link
                to="/women"
                className={`header__link ${openMenu === 'women' ? 'is-active' : ''}`}
                onMouseEnter={() => handleOpen('women')}
                onClick={() => handleLinkClick('women')}
              >
                Женщинам
              </Link>

              <Link
                to="/men"
                className={`header__link ${openMenu === 'men' ? 'is-active' : ''}`}
                onMouseEnter={() => handleOpen('men')}
                onClick={() => handleLinkClick('men')}
              >
                Мужчинам
              </Link>

              <Link to="/about" className="header__link">
                О нас
              </Link>
            </nav>
          </div>

          <div className="header__right">
            <button className="header__link">Авторизация</button>
            <button className="header__link">
              <SearchIcon/>
              Поиск
            </button>
            <button className="header__link">
              <CartIcon/>
              Корзина
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mega-menu ${isMenuVisible ? 'mega-menu--visible' : ''}`}
        onMouseEnter={clearTimers}
        onMouseLeave={scheduleClose}
      >
        <div className="container">
          {!loading && openMenu && (
            <MegaMenu
              data={currentData}
              subcategoriesByCategory={subcategoriesByCategory}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;