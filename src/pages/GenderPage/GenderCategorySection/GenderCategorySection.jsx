import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './GenderCategorySection.scss';

const GenderCategorySection = ({gender, category, subcategories, loading = false}) => {
  const skeletonCount = 4;
  const list = loading ? Array.from({length: skeletonCount}) : subcategories;
  const genderParam = gender === 'M' ? 'M' : 'F';

  return (
    <section className="gender-section">
      <h2 className="gender-section__title">
        {loading ? <Skeleton width={180} height={28}/> : category.name}
      </h2>

      <ul className="gender-section__list">
        {list.map((item, index) =>
          loading ? (
            <li key={index}>
              <div className="gender-section__link gender-section__link--skeleton">
                <Skeleton style={{width: '100%', height: '100%'}}/>
              </div>
            </li>
          ) : (
            <li key={item.id}>
              <Link
                to={`/catalog?gender=${genderParam}&subcategory=${item.id}`}
                className="gender-section__link"
              >
                <div className="gender-section__image-wrap">
                  {item.cover_image && (
                    <img
                      src={item.cover_image}
                      alt={item.name}
                      loading="lazy"
                      className="gender-section__image"
                    />
                  )}
                </div>
                <span className="btn btn--black gender-section__name">
                  {item.name}
                </span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  );
};

export default GenderCategorySection;