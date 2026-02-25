import {Link} from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = ({items, className = ''}) => {
  if (!items?.length) return null;
// авпвап
// здесь была группа ИП-3
  return (
    <nav className={`breadcrumbs ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        const content = item.to ? (
          <Link to={item.to} className="breadcrumbs__link">
            {item.label}
          </Link>
        ) : (
          <span className="breadcrumbs__current">
            {item.label}
          </span>
        );

        return (
          <span key={index} className="breadcrumbs__item">
            {content}

            {!isLast && (
              <span className="breadcrumbs__separator">
                /
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;