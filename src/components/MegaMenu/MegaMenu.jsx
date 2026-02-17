import './MegaMenu.scss';

const MegaMenu = ({data, subcategoriesByCategory}) => {
  const {categories, materials} = data;
  const mainCategories = categories.slice(0, 3);

  return (
    <div className="mega-menu__wrapper">
      {mainCategories.map((cat) => (
        <div key={cat.id} className="mega-menu__column">
          <div className="mega-menu__title">{cat.name}</div>
          <ul className="mega-menu__list">
            {(subcategoriesByCategory[cat.id] || []).map((sc) => (
              <li key={sc.id}>
                <a
                  href={`/catalog?subcategory=${sc.id}`}
                  className="mega-menu__link"
                >
                  {sc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mega-menu__column">
        <div className="mega-menu__title">Материалы</div>
        <ul className="mega-menu__list">
          {materials.map((mat) => (
            <li key={mat.id}>
              <a
                href={`/catalog?material=${mat.id}`}
                className="mega-menu__link"
              >
                {mat.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MegaMenu;