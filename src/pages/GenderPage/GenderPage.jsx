import {useEffect, useState} from 'react';
import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import {getCategories, getSubcategories} from '@/api/catalog.js';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.jsx';
import GenderHero from './GenderHero/GenderHero.jsx';
import GenderCategorySection from './GenderCategorySection/GenderCategorySection.jsx';
import GenderMaterialsSection from './GenderMaterialsSection/GenderMaterialsSection.jsx';

import './GenderPage.scss';

const GenderPage = ({gender}) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const catRes = await getCategories({gender});
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

    setLoading(true);
    setCategories([]);
    setSubcategories([]);
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
          <Breadcrumbs items={breadcrumbItems} className="gender__breadcrumbs"/>
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
              : regularCategories.map((cat) => {
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

            {materialCategories.length > 0 && (
              <GenderMaterialsSection
                gender={gender}
                materials={materialCategories}
                loading={loading}
              />
            )}
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default GenderPage;