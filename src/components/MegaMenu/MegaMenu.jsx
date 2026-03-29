import './MegaMenu.scss';
import { motion } from 'framer-motion';

const columnVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
  }
};

const MegaMenu = ({data, subcategoriesByCategory}) => {
  const {categories, materials} = data;
  const mainCategories = categories.slice(0, 3);

  return (
    <motion.div
      className="mega-menu__wrapper"
      variants={listVariants}
    >
      {mainCategories.map((cat) => (
        <motion.div
          key={cat.id}
          className="mega-menu__column"
          variants={columnVariants}
        >
          <div className="mega-menu__title">{cat.name}</div>
          <motion.ul className="mega-menu__list" variants={listVariants}>
            {(subcategoriesByCategory[cat.id] || []).map((sc) => (
              <motion.li key={sc.id} variants={itemVariants}>
                <a
                  href={`/catalog?subcategory=${sc.id}`}
                  className="mega-menu__link"
                >
                  {sc.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      ))}

      {materials.length > 0 && (
        <motion.div
          className="mega-menu__column"
          variants={columnVariants}
        >
          <div className="mega-menu__title">Материалы</div>
          <motion.ul className="mega-menu__list" variants={listVariants}>
            {materials.map((mat) => (
              <motion.li key={mat.id} variants={itemVariants}>
                <a href={`/catalog?material=${mat.id}`} className="mega-menu__link">
                  {mat.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MegaMenu;