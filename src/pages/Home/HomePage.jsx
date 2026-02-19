import {useEffect, useState} from 'react';
import Header from '@/components/Header/Header.jsx';
import HeroSection from '@/pages/Home/HeroSection/HeroSection.jsx';
import CategoryShowcase from '@/components/CategoryShowcase/CategoryShowcase.jsx';
import {getSubcategories} from '@/api/catalog.js';
import Materials from "@/pages/Home/Materials/Materials.jsx";
import Footer from "@/components/Footer/Footer.jsx";

const HomePage = () => {
  const [womenItems, setWomenItems] = useState([]);
  const [menItems, setMenItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMainSubcategories = async () => {
      try {
        const res = await getSubcategories({ show_on_main: true });
        const subcats = res.data;

        const women = [];
        const men = [];

        subcats.forEach((sc) => {
          const item = {
            id: sc.id,
            name: sc.name,
            image: sc.cover_image,
            link: `/catalog?subcategory=${sc.id}`,
          };

          if (sc.category.gender === 'F') {
            women.push(item);
          } else if (sc.category.gender === 'M') {
            men.push(item);
          }
        });

        setWomenItems(women.slice(0, 4));
        setMenItems(men.slice(0, 4));
      } catch (e) {
        console.error('Failed to load main subcategories', e);
      } finally {
        setLoading(false);
      }
    };

    loadMainSubcategories();
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <CategoryShowcase
        title="Женская линейка"
        viewAllLink="/catalog?gender=F"
        items={womenItems}
        loading={loading}
      />
      <CategoryShowcase
        title="Мужская линейка"
        viewAllLink="/catalog?gender=M"
        items={menItems}
        loading={loading}
      />
      <Materials />
      <Footer/>
    </>
  );
};

export default HomePage;