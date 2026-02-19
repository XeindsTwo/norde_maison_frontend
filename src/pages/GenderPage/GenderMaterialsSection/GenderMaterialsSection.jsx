import {Link} from 'react-router-dom';

const GenderMaterialsSection = ({gender, materials}) => {
  return (
    <section className="gender-section">
      <div className="gender-section__top">
        <h2 className="gender-section__title">Материалы</h2>
      </div>

      <ul className="gender-section__list gender-section__list--materials">
        {materials.map((mat) => (
          <li key={mat.id} className="gender-section__item">
            <Link
              to={`/catalog?gender=${gender}&material=${mat.id}`}
              className="gender-section__link gender-section__link--material"
            >
              <span className="gender-section__name">{mat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GenderMaterialsSection;