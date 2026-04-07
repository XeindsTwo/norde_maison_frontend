import './Header.scss';
import {useEffect, useState, useRef} from 'react';
import {getCategories, getSubcategories} from '@/api/catalog.js';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';
import {useAuth} from "@/context/AuthContext";
import {Link} from 'react-router-dom';
import HeaderActions from "./HeaderActions.jsx";
import HeaderInfo from "./HeaderInfo.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import HeaderMobile from './HeaderMobile/HeaderMobile.jsx';

const Header = () => {
  const {isAuth} = useAuth();
  const [openMenu, setOpenMenu] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [womenData, setWomenData] = useState({categories: [], materials: []});
  const [menData, setMenData] = useState({categories: [], materials: []});
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const closeTimeoutRef = useRef(null);
  const openTimeoutRef = useRef(null);
  const hoverLockRef = useRef({type: null, locked: false});
  const headerRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [womenCatsRes, menCatsRes, womenMaterialsRes, menMaterialsRes, subcatsRes] = await Promise.all([
          getCategories({gender: 'F', is_material: false}),
          getCategories({gender: 'M', is_material: false}),
          getSubcategories({gender: 'F', only_materials: true}),
          getSubcategories({gender: 'M', only_materials: true}),
          getSubcategories(),
        ]);

        const groupedSubcats = {};
        subcatsRes.data.forEach((sc) => {
          const id = sc.category.id;
          if (!groupedSubcats[id]) groupedSubcats[id] = [];
          groupedSubcats[id].push(sc);
        });

        setWomenData({
          categories: womenCatsRes.data,
          materials: womenMaterialsRes.data,
        });

        setMenData({
          categories: menCatsRes.data,
          materials: menMaterialsRes.data,
        });

        setSubcategoriesByCategory(groupedSubcats);
      } catch (e) {
        console.error('Header load error:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    if (closeTimeoutRef.current) {
      return;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuVisible(false);
      setTimeout(() => {
        setOpenMenu(null);
      }, 250);
      closeTimeoutRef.current = null;
    }, 200);
  };

  const handleOpen = (type) => {
    const lock = hoverLockRef.current;
    if (lock.locked && lock.type === type) {
      hoverLockRef.current = {type: null, locked: false};
      return;
    }
    clearTimers();
    openTimeoutRef.current = setTimeout(() => {
      setOpenMenu(type);
      setIsMenuVisible(true);
      openTimeoutRef.current = null;
    }, 100);
  };

  const handleLinkClick = (type) => {
    hoverLockRef.current = {type, locked: true};
  };

  const currentData =
      openMenu === 'women'
          ? womenData
          : openMenu === 'men'
              ? menData
              : {categories: [], materials: []};

  const menuVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleNavMouseEnter = () => {
    clearTimers();
  };

  const handleNavMouseLeave = () => {
    scheduleClose();
  };

  const handleMenuMouseEnter = () => {
    clearTimers();
  };

  const handleMenuMouseLeave = () => {
    scheduleClose();
  };

  if (isMobile) {
    return <HeaderMobile />;
  }

  return (
      <header className="header" ref={headerRef}>
        <HeaderInfo/>
        <div className="container">
          <div className="header__top">
            <div className="header__left">
              <Link to="/" className="header__logo">
                <img src="/images/logo.svg" width={189} height={24} alt="Nordé Maison"/>
              </Link>

              <nav
                  className="header__nav"
                  onMouseEnter={handleNavMouseEnter}
                  onMouseLeave={handleNavMouseLeave}
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
            <HeaderActions />
          </div>
        </div>

        {isMenuVisible && (
            <div
                className="mega-menu mega-menu--visible"
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMenuMouseLeave}
            >
              <div className="container">
                {!loading && openMenu && (
                    <AnimatePresence mode="wait">
                      <motion.div
                          key={openMenu}
                          className="mega-menu__content"
                          variants={menuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                      >
                        <MegaMenu data={currentData} subcategoriesByCategory={subcategoriesByCategory}/>
                      </motion.div>
                    </AnimatePresence>
                )}
              </div>
            </div>
        )}
      </header>
  );
};

export default Header;