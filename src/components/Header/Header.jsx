import { useEffect, useState } from 'react';
import './Header.scss';
import { getCategories, getSubcategories } from '@/api/catalog.js';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';

import SearchIcon from '@/assets/images/icons/bx_search.svg';
import CartIcon from '@/assets/images/icons/bx_cart.svg';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [womenData, setWomenData] = useState({ categories: [], materials: [] });
  const [menData, setMenData] = useState({ categories: [], materials: [] });
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          womenCategoriesRes,
          menCategoriesRes,
          materialsRes,
          subcatsRes,
        ] = await Promise.all([
          getCategories({ gender: 'F', is_material: false }),
          getCategories({ gender: 'M', is_material: false }),
          getCategories({ is_material: true }),
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

  return (
    <header
      className="header"
      onMouseLeave={() => setOpenMenu(null)}
    >
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
            <button className="header__link">Авторизация</button>
            <button className="header__link">
              <SearchIcon />
              Поиск
            </button>
            <button className="header__link">
              <CartIcon />
              Корзина
            </button>
          </div>
        </div>
      </div>
      <div className={`mega-menu ${openMenu ? 'mega-menu--visible' : ''}`}>
        <div className="container">
          {!loading && (
            <MegaMenu
              data={
                openMenu === 'women'
                  ? womenData
                  : openMenu === 'men'
                    ? menData
                    : { categories: [], materials: [] }
              }
              subcategoriesByCategory={subcategoriesByCategory}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;