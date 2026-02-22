import Header from '@/components/Header/Header.jsx';
import HeroSection from '@/pages/Home/HeroSection/HeroSection.jsx';
import CategoryShowcase from '@/components/CategoryShowcase/CategoryShowcase.jsx';
import Materials from "@/pages/Home/Materials/Materials.jsx";
import Footer from "@/components/Footer/Footer.jsx";

import {useQuery} from "@tanstack/react-query";
import {getSubcategories} from '@/api/catalog.js';

const HomePage = () => {

  const {data: womenItems = [], isLoading: womenLoading} = useQuery({
    queryKey: ['home-subcategories', 'F'],
    queryFn: async () => {
      const res = await getSubcategories({show_on_main: true});
      const subcats = res.data;

      return subcats
        .filter(sc => sc.category.gender === 'F')
        .slice(0, 4)
        .map(sc => ({
          id: sc.id,
          name: sc.name,
          image: sc.cover_image,
          link: `/catalog?gender=F&subcategory=${sc.id}`
        }));
    }
  });

  const {data: menItems = [], isLoading: menLoading} = useQuery({
    queryKey: ['home-subcategories', 'M'],
    queryFn: async () => {
      const res = await getSubcategories({show_on_main: true});
      const subcats = res.data;

      return subcats
        .filter(sc => sc.category.gender === 'M')
        .slice(0, 4)
        .map(sc => ({
          id: sc.id,
          name: sc.name,
          image: sc.cover_image,
          link: `/catalog?gender=M&subcategory=${sc.id}`
        }));
    }
  });

  const loading = womenLoading || menLoading;

  return (
    <>
      <Header/>
      <HeroSection/>

      <CategoryShowcase
        title="Женская линейка"
        viewAllLink="/women"
        items={womenItems}
        loading={loading}
      />

      <CategoryShowcase
        title="Мужская линейка"
        viewAllLink="/men"
        items={menItems}
        loading={loading}
      />

      <Materials/>

      <Footer/>
    </>
  );
};

export default HomePage;