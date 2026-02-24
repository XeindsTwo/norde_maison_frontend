import './GenderPage.scss';
import {useQuery} from '@tanstack/react-query';
import {getCategories, getSubcategories} from '@/api/catalog.js';

import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.jsx';
import GenderHero from '../../components/GenderHero/GenderHero.jsx';
import GenderCategorySection from './GenderCategorySection/GenderCategorySection.jsx';

const GenderPage = ({gender}) => {

  const {data: categories = [], isLoading: categoriesLoading} = useQuery({
    queryKey: ['categories', gender],
    queryFn: async () => {
      const res = await getCategories({gender});
      return res.data;
    }
  });

  const {data: subcategories = [], isLoading: subcategoriesLoading} = useQuery({
    queryKey: ['subcategories'],
    queryFn: async () => {
      const res = await getSubcategories({});
      return res.data;
    }
  });

  const loading = categoriesLoading || subcategoriesLoading;

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.name === "Материалы") return 1;
    if (b.name === "Материалы") return -1;
    return a.order - b.order;
  });

  const subcatsByCategoryId = sortedCategories.reduce((acc, cat) => {
    acc[cat.id] = subcategories.filter(
      sc => sc.category.id === cat.id
    );
    return acc;
  }, {});

  const isMen = gender === 'M';

  const breadcrumbItems = [
    {label: 'Главная', to: '/'},
    {label: isMen ? 'Мужчинам' : 'Женщинам'},
  ];

  const skeletonSections = Array.from({length: 3});

  return (
    <>
      <Header/>

      <main className="gender">
        <div className="container container--padding">

          <Breadcrumbs items={breadcrumbItems}/>
          <GenderHero gender={gender}/>

          <section className="gender__sections">

            {loading
              ? skeletonSections.map((_, index) => (
                <GenderCategorySection
                  key={index}
                  gender={gender}
                  category={{name: ''}}
                  subcategories={[]}
                  loading={true}
                />
              ))
              : sortedCategories.map(cat => {

                const list = subcatsByCategoryId[cat.id] || [];
                if (!list.length) return null;

                return (
                  <GenderCategorySection
                    key={cat.id}
                    gender={gender}
                    category={cat}
                    subcategories={list}
                    loading={false}
                  />
                );

              })}

          </section>

        </div>
      </main>

      <Footer/>
    </>
  );
};

export default GenderPage;