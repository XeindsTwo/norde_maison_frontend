import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CategoryCard from './CategoryCard';
import './CategoryShowcase.scss';

const CategoryShowcase = ({
                            title,
                            viewAllLink,
                            items = [],
                            loading = false,
                            skeletonCount = 4,
                          }) => {
  const list = loading ? Array.from({ length: skeletonCount }) : items;

  return (
    <section className="category-showcase">
      <div className="container container--padding">
        <div className="category-showcase__top">
          <h2 className="category-showcase__title">
            {loading ? <Skeleton width={180} height={32} /> : title}
          </h2>

          {loading ? (
            <Skeleton width={120} height={20} />
          ) : (
            <Link to={viewAllLink} className="category-showcase__all">
              Посмотреть все
            </Link>
          )}
        </div>

        <ul className="category-showcase__list">
          {list.map((item, index) =>
            loading ? (
              <CategoryCard key={index} loading />
            ) : (
              <CategoryCard key={item.id} {...item} />
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default CategoryShowcase;