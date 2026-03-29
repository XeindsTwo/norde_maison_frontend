import './GenderPage.scss';
import {useQuery} from '@tanstack/react-query';
import {getCategories, getSubcategories} from '@/api/catalog.js';

import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.jsx';
import GenderHero from '../../components/GenderHero/GenderHero.jsx';
import GenderCategorySection from './GenderCategorySection/GenderCategorySection.jsx';

const GenderPage = ({gender}) => {
  const isMen = gender === 'M';

  const {data: categories = [], isLoading: categoriesLoading} = useQuery({
    queryKey: ['categories', gender],
    queryFn: async () => {
      const res = await getCategories({gender});
      return res.data;
    }
  });

  const {data: ordinarySubcats = [], isLoading: ordinaryLoading} = useQuery({
    queryKey: ['subcategories', gender, 'ordinary'],
    queryFn: async () => {
      const res = await getSubcategories({gender, only_materials: false});
      return res.data;
    }
  });

  const {data: materialSubcats = [], isLoading: materialsLoading} = useQuery({
    queryKey: ['subcategories', gender, 'materials'],
    queryFn: async () => {
      const res = await getSubcategories({gender, only_materials: true});
      return res.data;
    }
  });

  const loading = categoriesLoading || ordinaryLoading || materialsLoading;

  const ordinaryCategories = categories.filter(cat => cat.name !== 'Материалы');
  const materialCategory = categories.find(cat => cat.name === 'Материалы');

  const sortedOrdinaryCategories = [...ordinaryCategories].sort((a, b) => a.order - b.order);

  const ordinaryByCategoryId = ordinarySubcats.reduce((acc, sc) => {
    const catId = sc.category.id;
    if (!acc[catId]) acc[catId] = [];
    acc[catId].push(sc);
    return acc;
  }, {});

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
            {loading ? (
              skeletonSections.map((_, index) => (
                <GenderCategorySection
                  key={index}
                  gender={gender}
                  category={{name: ''}}
                  subcategories={[]}
                  loading={true}
                  isMaterialCategory={false}
                />
              ))
            ) : (
              <>
                {sortedOrdinaryCategories.map(cat => {
                  const list = ordinaryByCategoryId[cat.id] || [];
                  if (!list.length) return null;

                  return (
                    <GenderCategorySection
                      key={cat.id}
                      gender={gender}
                      category={cat}
                      subcategories={list}
                      loading={false}
                      isMaterialCategory={false}
                    />
                  );
                })}

                {materialCategory && materialSubcats.length > 0 && (
                  <GenderCategorySection
                    gender={gender}
                    category={materialCategory}
                    subcategories={materialSubcats}
                    loading={false}
                    isMaterialCategory={true}
                  />
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <Footer/>
    </>
  );
};

export default GenderPage;