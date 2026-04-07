import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories, getSubcategories } from "@/api/catalog.js";
import CloseIcon from "@/assets/images/icons/close.svg";
import ArrowIconLink from "@/assets/images/icons/arrow-link.svg";
import "./HeaderMobileMenu.scss";

const HeaderMobileMenu = ({ isOpen, onClose, currencyData, currency }) => {
  const [womenData, setWomenData] = useState({ categories: [], materials: [] });
  const [menData, setMenData] = useState({ categories: [], materials: [] });
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState(new Set());

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          womenCatsRes,
          menCatsRes,
          womenMaterialsRes,
          menMaterialsRes,
          subcatsRes,
        ] = await Promise.all([
          getCategories({ gender: "F", is_material: false }),
          getCategories({ gender: "M", is_material: false }),
          getSubcategories({ gender: "F", only_materials: true }),
          getSubcategories({ gender: "M", only_materials: true }),
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
        console.error("Mobile menu load error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleCategory = (category) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const isCategoryOpen = (category) => openCategories.has(category);

  const categoryVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: 16,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const renderCategories = (gender, data) => (
    <AnimatePresence>
      {isCategoryOpen(gender) && !loading && (
        <motion.ul
          className="header-mobile-menu__categories"
          variants={categoryVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          layout
        >
          {data.categories.map((category) => (
            <li key={category.id} className="header-mobile-menu__category">
              <span>{category.name}</span>
              <ul className="header-mobile-menu__subcategorys">
                {subcategoriesByCategory[category.id]?.map((subcat) => (
                  <li key={subcat.id}>
                    <a
                      href={`/catalog?subcategory=${subcat.id}`}
                      className="header-mobile-menu__subcategory"
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        window.location.href = `/catalog?subcategory=${subcat.id}`;
                      }}
                    >
                      {subcat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="header-mobile-menu"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="header-mobile-menu__header">
            <Link to="/" className="header-mobile-menu__logo" onClick={onClose}>
              <img
                src="/images/logo.svg"
                width={189}
                height={24}
                alt="Nordé Maison"
              />
            </Link>
            <button
              className="header-mobile-menu__close"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          </div>

          <ul className="header-mobile-menu__nav">
            <li>
              <button
                className={`header-mobile-menu__link ${isCategoryOpen("women") ? "is-active" : ""}`}
                onClick={() => toggleCategory("women")}
              >
                Женщинам
                <ArrowIconLink />
              </button>
              {renderCategories("women", womenData)}
            </li>

            <li>
              <button
                className={`header-mobile-menu__link ${isCategoryOpen("men") ? "is-active" : ""}`}
                onClick={() => toggleCategory("men")}
              >
                Мужчинам
                <ArrowIconLink />
              </button>
              {renderCategories("men", menData)}
            </li>

            <li>
              <Link
                to="/about"
                className="header-mobile-menu__link"
                onClick={onClose}
              >
                О нас
              </Link>
            </li>
          </ul>

          <div className="header-mobile-menu__footer">
            <span className="header-mobile-menu__currency">
              {currencyData.text} ({currency.toUpperCase()}{" "}
              {currencyData.symbol})
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderMobileMenu;
