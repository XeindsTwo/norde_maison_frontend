import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header.jsx';
import { getCategories, getSubcategories } from '@/api/catalog.js';
import './GenderPage.scss';

const GenderPage = ({ gender }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const catRes = await getCategories({ gender });
        const cats = catRes.data;

        const subcatRes = await getSubcategories({});
        const sc = subcatRes.data;

        const filteredSubcats = sc.filter(
          (item) => item.category.gender === gender,
        );

        setCategories(cats);
        setSubcategories(filteredSubcats);
      } catch (e) {
        console.error('Failed to load gender page data', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [gender]);

  const materialCategories = categories.filter((c) => c.is_material);
  const regularCategories = categories.filter((c) => !c.is_material);

  const subcatsByCategoryId = regularCategories.reduce((acc, cat) => {
    acc[cat.id] = subcategories.filter(
      (sc) => sc.category.id === cat.id,
    );
    return acc;
  }, {});

  const isMen = gender === 'M';

  return (
    <>
      <Header />

      <main className="gender">
        <div className="container container--padding">
          {/* Хлебные крошки */}
          <nav className="gender__breadcrumbs">
            <Link to="/" className="gender__breadcrumbs-link">
              Главная
            </Link>
            <span className="gender__breadcrumbs-separator">/</span>
            <span className="gender__breadcrumbs-current">
              {isMen ? 'Мужчинам' : 'Женщинам'}
            </span>
          </nav>

          {/* Hero-блок */}
          <section className="gender__hero">
            {isMen ? (
              <>
                <h1 className="gender__title">Осознанная мужская одежда</h1>
                <p className="gender__intro">
                  Минималистичная мужская одежда — это не тренд, а выбор в пользу качества и продуманности.
                </p>
                <p className="gender__description">
                  Мы создаём вещи для современного мужчины, которому важны простота, комфорт и долговечность.
                  Каждая модель выполнена из органичных материалов и проходит аккуратную обработку, чтобы
                  служить дольше, сохранять форму и оставаться удобной каждый день.
                </p>
              </>
            ) : (
              <>
                <h1 className="gender__title">Осознанная женская одежда</h1>
                <p className="gender__intro">
                  Минималистичный женский гардероб — это база, которая работает каждый день.
                </p>
                <p className="gender__description">
                  Мы создаём вещи из органичных материалов, которые приятно носить, легко сочетать
                  и хочется оставлять в гардеробе на годы.
                </p>
              </>
            )}
          </section>

          {/* Секции по категориям */}
          <section className="gender__sections">
            {loading ? (
              <p className="gender__loading">Загрузка...</p>
            ) : (
              <>
                {regularCategories.map((cat) => {
                  const list = subcatsByCategoryId[cat.id] || [];
                  if (!list.length) return null;

                  return (
                    <section key={cat.id} className="gender-section">
                      <div className="gender-section__top">
                        <h2 className="gender-section__title">{cat.name}</h2>

                        <Link
                          to={`/catalog?gender=${gender}&category=${cat.id}`}
                          className="gender-section__all"
                        >
                          Смотреть всё
                        </Link>
                      </div>

                      <ul className="gender-section__list">
                        {list.map((sc) => (
                          <li key={sc.id} className="gender-section__item">
                            <Link
                              to={`/catalog?gender=${gender}&subcategory=${sc.id}`}
                              className="gender-section__link"
                            >
                              <div className="gender-section__image-wrap">
                                {sc.cover_image && (
                                  <img
                                    src={sc.cover_image}
                                    alt={sc.name}
                                    loading="lazy"
                                    className="gender-section__image"
                                  />
                                )}
                              </div>
                              <span className="gender-section__name">{sc.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}

                {/* Секция Материалы */}
                {materialCategories.length > 0 && (
                  <section className="gender-section">
                    <div className="gender-section__top">
                      <h2 className="gender-section__title">Материалы</h2>
                    </div>

                    <ul className="gender-section__list gender-section__list--materials">
                      {materialCategories.map((mat) => (
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
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default GenderPage;