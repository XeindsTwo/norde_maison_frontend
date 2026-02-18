import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoryCard = ({ image, name, link, loading = false }) => {
  return (
    <li className="category-showcase__item">
      {loading ? (
        <div className="category-showcase__link category-showcase__link--skeleton">
          <Skeleton style={{ width: '100%', height: '100%' }} />
        </div>
      ) : (
        <Link to={link} className="category-showcase__link">
          <img src={image} alt={name} loading="lazy" />
          <span className="btn btn--black category-showcase__name">{name}</span>
        </Link>
      )}
    </li>
  );
};

export default CategoryCard;
