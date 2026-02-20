import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = ({ items, className = '' }) => {
  if (!items || !items.length) return null;

  return (
    <nav className={`breadcrumbs ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="breadcrumbs__item">
            {item.to && !isLast ? (
              <Link to={item.to} className="breadcrumbs__link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumbs__current">{item.label}</span>
            )}

            {!isLast && (
              <span className="breadcrumbs__separator">/</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;