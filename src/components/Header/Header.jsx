import { useEffect, useState } from 'react';
import './Header.scss';
import { getCategories, getSubcategories } from '@/api/catalog.js';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';

import SearchIcon from '@/assets/images/icons/bx_search.svg';
import CartIcon from '@/assets/images/icons/bx_cart.svg';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null); // 'women' | 'men' | null
  const [womenData, setWomenData] = useState({ categories: [], materials: [] });
  const [menData, setMenData] = useState({ categories: [], materials: [] });
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [womenCategoriesRes, menCategoriesRes, materialsRes, subcatsRes] =
          await Promise.all([
            getCategories({ gender: 'F', is_material: false }),
            getCategories({ gender: 'M', is_material: false }),
            getCategories({ is_material: true }),
            getSubcategories(),
          ]);

        const subcats = subcatsRes.data;
        const grouped = {};
        subcats.forEach((sc) => {
          const catId = sc.category.id;
          if (!grouped[catId]) grouped[catId] = [];
          grouped[catId].push(sc);
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
        console.error('Failed to load header data', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  return (
    <header className="header">
      <div className="header__info">
        <div className="container">
          <div className="header__info-inner">
            <span className="header__subtext">Минимализм, созданный для жизни.</span>
            <span className="header__valute">Российская Федерация (RUB ₽)</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="header__inner">
          <div className="header__top">
            <div className="header__left">
              <img
                src="/images/logo.svg"
                width={189}
                height={24}
                alt="Norde Maison"
              />

              <nav className="header__nav">
                <button
                  type="button"
                  className={`header__link ${openMenu === 'women' ? 'is-active' : ''}`}
                  onMouseEnter={() => setOpenMenu('women')}
                >
                  Женщинам
                </button>
                <button
                  type="button"
                  className={`header__link ${openMenu === 'men' ? 'is-active' : ''}`}
                  onMouseEnter={() => setOpenMenu('men')}
                >
                  Мужчинам
                </button>
                <a href="#about" className="header__link">
                  О нас
                </a>
              </nav>
            </div>

            <div className="header__right">
              <button type="button" className="header__link">
                Авторизация
              </button>
              <button type="button" className="header__link">
                <SearchIcon />
                Поиск
              </button>
              <button type="button" className="header__link">
                <CartIcon />
                Корзина
              </button>
            </div>
          </div>
        </div>
      </div>
      {(openMenu === 'women' || openMenu === 'men') && !loading && (
        <div
          className={`mega-menu ${
            openMenu ? 'mega-menu--visible' : ''
          }`}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container">
            <MegaMenu
              data={openMenu === 'women' ? womenData : menData}
              subcategoriesByCategory={subcategoriesByCategory}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;